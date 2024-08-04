from django.db import models

# Create your models here.

class Article(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    image = models.ImageField(upload_to='images/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    author_username = models.CharField(max_length=100,blank=True,null=True)
    author_email = models.EmailField(max_length=100,blank=True, null=True)

    def __srt__(self):
        return self.title
