from django.urls import path
from . import views

urlpatterns = [
    path('', views.product_list, name = 'product_list'),
    path('register', views.register, name = 'register'),
    path('login', views.user_login, name = 'login'),
    path('logout', views.user_logout, name = 'logout'),
    path('add-to-cart/<int:product_id>/', views.add_to_cart, name = 'add_to_cart'),
    path('cart/', views.view_cart, name = 'view_cart'),
    path('update-cart/<int:item_id>/', views.update_cart_item, name = 'update_cart_item'),
    path('remove-from-cart/<int:item_id>/', views.remove_from_cart, name = 'remove_from_cart')
]