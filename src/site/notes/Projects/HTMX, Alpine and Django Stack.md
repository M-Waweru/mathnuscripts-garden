---
{"dg-publish":true,"permalink":"/projects/htmx-alpine-and-django-stack/","noteIcon":"2"}
---

For my small projects on the side, I can use HTMX, Alpine and Django instead of learning React and all that.

References [here](https://www.sheenaoc.com/articles/2024-06-30-htmx) and [here](https://chatgpt.com/c/991e9a88-0d54-4c31-bda0-ebddc81e00d7)

Write up a guide on building a HTMX, Alpine and Django project?

Building a project with HTMX, Alpine, and Django involves several steps. This guide will walk you through all the necessary steps to set up a project using these technologies.

1. **Setup Django Project**
Firstly, you need to set up your Django project. 

- Install Django: To install Django, open your terminal and type the following command:

  ```
  pip install django
  ```
- Create a new Django project:

  ```
  django-admin startproject myproject
  ```

2. **Install HTMX**
HTMX allows you to access AJAX, CSS Transitions, WebSockets and Server Sent Events directly in HTML.

- Download the HTMX library from https://htmx.org/.
- Paste the downloaded file into your static directory in your Django project.
- In your HTML file where you want to use HTMX features, link it as follows:

   ```html
   <script src="{% static 'htmx.min.js' %}"></script>
   ```

3. **Install Alpine.js**
Alpine.js is a rugged, minimal framework for composing JavaScript behavior in your markup.

- Download Alpine.js from https://github.com/alpinejs/alpine/.
- Paste it into your static directory in your Django project.
- Link it in your HTML file as follows:

    ```html
    <script src="{% static 'alpine.min.js' %}"></script>
    ```

4. **Setting Up Models**
In models.py of your app create the models that fits your requirements. An example model would be:

```python
from django.db import models

class MyModel(models.Model):
    name = models.CharField(max_length=200)
```
Run `python manage.py makemigrations` and `python manage.py migrate` commands to apply these changes to database.

5. **Setting Up Views**
In views.py of your app create the views that fit requirements. A basic example view would be:

```python
from django.shortcuts import render
from .models import MyModel

def my_view(request):
    models = MyModel.objects.all()
    return render(request, 'my_template.html', {'models': models})
```

6. **Setting Up Templates**
In your template, you can now use HTMX and Alpine.js. An example of a template using HTMX to submit a form would be:

```html
<form hx-post="{% url 'my_view' %}" hx-target="#mydiv">
    <input type="text" name="name">
    <input type="submit">
</form>

<div id="mydiv"></div>
```
This form will make a POST request to the 'my_view' url and replace the content of the div with id "mydiv" with the response without reloading the page.

7. **Setting Up URL**
Finally, set up URLs for your views in urls.py file.

```python
from django.urls import path

from .views import my_view

urlpatterns = [
    path('my-view/', my_view, name='my_view'),
]
```

Now you have set up a basic Django project with HTMX and Alpine.js. You can run this project using `python manage.py runserver` command.

Remember to check official documentation of Django, HTMX and Alpine.js for more complex applications and features.

Also note that while Django comes with its own server, it's not meant for production. In a production environment you should use a server like Gunicorn or uWSGI etc., and serve static files separately using NGINX or Apache etc.