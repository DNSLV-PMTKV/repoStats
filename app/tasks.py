import json
import requests

from celery.utils.log import get_task_logger

logger = get_task_logger(__name__)

from celery import shared_task
from .models import RepositoryViews, Repository


@shared_task()
def getGithubData():
    all_repos = Repository.objects.all()

    repo_list = []
    for repo in all_repos:
        splitted = repo.url.split('/')
        repo_list.append((splitted[-2], splitted[-1], repo))

    for repo in repo_list:
        url = f'https://api.github.com/repos/{repo[0]}/{repo[1]}/traffic/clones'

        headers = {
            'Authorization': 'Token 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'}
        r = requests.get(url=url, headers=headers)
        r_status = r.status_code
        logger.info("REQUEST")
        logger.info(r.json())
        if r_status == 200:
            binary = r.content
            data = json.loads(binary)
            for githubDataRecord in data['clones']:
                repoView = None
                try:
                    repoView = RepositoryViews.objects.get(
                        timestamp=githubDataRecord['timestamp'], repo=repo[2])
                except RepositoryViews.DoesNotExist:
                    repoView = None

                if not repoView:
                    logger.info("ADDING")
                    repoView = RepositoryViews(
                        repo=repo[2], timestamp=githubDataRecord['timestamp'], count=githubDataRecord['count'], unique=githubDataRecord['uniques'])
                    repoView.save()
