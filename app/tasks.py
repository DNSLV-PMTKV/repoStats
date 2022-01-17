import json

import requests
from celery import shared_task
from celery.utils.log import get_task_logger
from django.conf import settings

from .models import Repository, RepositoryViews

logger = get_task_logger(__name__)


@shared_task()
def getGithubData():
    all_repos = Repository.objects.all()

    repo_list = []
    for repo in all_repos:
        splitted = repo.url.split('/')
        repo_list.append((splitted[-2], splitted[-1], repo))

    for repo in repo_list:
        url = f'https://api.github.com/repos/{repo[0]}/{repo[1]}/traffic/views'
        headers = {
            'Authorization': f'Token {settings.GITHUB_API_KEY}'}
        r = requests.get(url=url, headers=headers)
        r_status = r.status_code
        logger.info("REQUEST", r.json())
        if r_status == 200:
            data = json.loads(r.content)
            for githubDataRecord in data['views']:
                repoView = RepositoryViews.objects.filter(
                    timestamp=githubDataRecord['timestamp'], repo=repo[2])
                if not repoView:
                    logger.info("ADDING")
                    repoView = RepositoryViews(
                        repo=repo[2], timestamp=githubDataRecord['timestamp'], count=githubDataRecord['count'], unique=githubDataRecord['uniques'])
                    repoView.save()
