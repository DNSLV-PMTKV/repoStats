from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.exceptions import ValidationError


class CreateUserTests(TestCase):
    """ Tests for user creation. """

    url = reverse('users:user_create')

    def tearDown(self):
        get_user_model().objects.all().delete()

    def test_register_status_code(self):
        user_data = {'email': 'test@test.test'}
        response = self.client.post(self.url, user_data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_register_token_generated(self):
        user_data = {'email': 'test@test.test'}
        response = self.client.post(self.url, user_data)

        self.assertIn('token', response.data)
        self.assertIsNotNone(response.data['token'])

    def test_user_registration_without_mail(self):
        user_data = {'email': ''}
        response = self.client.post(self.url, user_data)

        self.assertRaises(expected_exception=ValidationError)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_user_object_is_created(self):
        user_data = {'email': 'test@test1234.asd'}
        response = self.client.post(self.url, user_data)

        self.assertTrue(get_user_model().objects.filter(
            token=response.data.get('token')).exists())

    def test_register_same_mail_twice(self):
        user_data = {'email': 'test123@test.com'}
        response1 = self.client.post(self.url, user_data)
        response2 = self.client.post(self.url, user_data)

        self.assertEqual(response1.status_code, status.HTTP_200_OK)
        self.assertEqual(response2.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertRaises(expected_exception=ValidationError)
