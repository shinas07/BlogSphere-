from django.urls import path
from .views import ArticleCreateView

urlpatterns = [
    path('create/',ArticleCreateView.as_view(), name='article-create')

]