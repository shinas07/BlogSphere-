from django.urls import path
from .views import ArticleCreateView, ArticleListView, ArticleDetailedView

urlpatterns = [
    path('create/',ArticleCreateView.as_view(), name='article-create'),
    path('articles/', ArticleListView.as_view(), name='article-list-view'),
    path('article/details/<int:id>/',ArticleDetailedView.as_view(), name='article-detail'),
]