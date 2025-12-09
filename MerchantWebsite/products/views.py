from django.shortcuts import render, redirect, get_object_or_404
from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib import messages
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required
from .models import Products, Cart, CartItem


def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            messages.success(request, "Registration successful.")
            return redirect('product_list')
    else:
        form = UserCreationForm()
    return render(request, "register.html", {"form": form})

def user_login(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('product_list')
        else:
            messages.error(request, "Invalid username or password.")
    return render(request, 'login.html')

def user_logout(request):
    logout(request)
    return redirect('product_list')

def product_list(request):
    products = Products.objects.all()
    context = {'products': products}
    return render(request, 'product_list.html', context)

@login_required
def add_to_cart(request, product_id):
    try:
        product = get_object_or_404(Products, id=product_id)

        if request.user.is_authenticated:
            cart, created = Cart.objects.get_or_create(user=request.user)
        else:
            cart_id = request.session.get('cart_id')
            if cart_id:
                cart = Cart.objects.filter(id=cart_id).first()
                if not cart:
                    cart = Cart.objects.create()
                    request.session['cart_id'] = cart.id
            else:
                cart = Cart.objects.create()
                request.session['cart_id'] = cart.id

        cart_item, created = CartItem.objects.get_or_create(
            cart=cart,
            product=product,
            defaults={'quantity': 1}
        )

        if not created:
            cart_item.quantity += 1
            cart_item.full_clean()
            cart_item.save()

        messages.success(request, f"{product.product} added to cart.")
        return redirect('product_list')

    except Products.DoesNotExist:
        messages.error(request, "Product not found.")
        return redirect("product_list")

    except Exception as e:
        messages.error(request, f"Error adding item: {str(e)}")
        return redirect("product_list")

@login_required
def view_cart(request):
    cart = None
    cart_items = []

    if request.user.is_authenticated:
        cart = Cart.objects.filter(user=request.user).first()
    else:
        cart_id = request.session.get('cart_id')
        if cart_id:
            cart = Cart.objects.filter(id=cart_id).first()

    if cart:
        cart_items = cart.items.all()

    context = {'cart': cart, 'cart_items': cart_items}
    return render(request, 'cart.html', context)

@login_required
def update_cart_item(request, item_id):
    cart_item = get_object_or_404(CartItem, id=item_id)

    if request.method == 'POST':
        try:
            quantity = int(request.POST.get('quantity', 1))
            if quantity > 0:
                cart_item.quantity = quantity
                cart_item.full_clean()
                cart_item.save()
                messages.success(request, "Cart updated.")
            else:
                cart_item.delete()
                messages.success(request, "Item removed from cart.")
        except ValueError:
            messages.error(request, "Invalid quantity value.")
        except Exception as e:
            messages.error(request, f"Error updating item: {str(e)}")

    return redirect('view_cart')

@login_required
def remove_from_cart(request, item_id):
    try:
        cart_item = get_object_or_404(CartItem, id=item_id)
        product_name = cart_item.product.product
        cart_item.delete()
        messages.success(request, f"{product_name} removed from cart.")
    except Exception as e:
        messages.error(request, f"Error removing item: {str(e)}")

    return redirect('view_cart')
