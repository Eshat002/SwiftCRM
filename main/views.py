from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse


@login_required
def get_headline_user(request):
    user = request.user
    first_name = user.first_name
    last_name = user.last_name
    username = user.username

    if first_name and last_name:
        displayed_name = f"{first_name} {last_name}"
    else:
        displayed_name = username
    
    data = {
        "displayed_name": displayed_name,
        "avatar":user.profile.avatar.url
    }
    
    return JsonResponse(data)

    