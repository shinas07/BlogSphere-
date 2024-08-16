# from django.shortcuts import render

from django.views import View
from django.http import HttpResponse, JsonResponse
from django.conf import settings
import requests
import json
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

@method_decorator(csrf_exempt, name='dispatch')
class GatewayView(View):
    def dispatch(self, request, *args, **kwargs):
        service = kwargs.get('service')
        print(service)
        if service == 'user':
            base_url = settings.USER_SERVICE_URL
        elif service == 'article':
            base_url = settings.ARTICLE_SERVICE_URL
        else:
            return JsonResponse({"error": "Invalid service"}, status=400)

        path = kwargs.get('path', '')
        url = f"{base_url}/api/{path}"


        method = request.method.lower()
        print(f"Routing {request.method} request for {service} to {url}")

        headers = {
            'Authorization': request.headers.get('Authorization', ''),
            'Content-Type': request.headers.get('Content-Type', 'application/json'),
        }

        try:
            if method == 'options':
                response = HttpResponse()
                response["Access-Control-Allow-Origin"] = "http://localhost:5173"
                response["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
                response["Access-Control-Allow-Headers"] = "Authorization, Content-Type, X-CSRFToken"
                response["Access-Control-Allow-Credentials"] = "true"
                return response
            else:
                if request.content_type == 'application/json':
                    data = json.loads(request.body) if request.body else {}
                else:
                    data = None
                print(data)
                # data = json.loads(request.body) if request.body else {}
                response = requests.request(
                    method,
                    url,
                    json=data,
                    headers=headers,
                    params=request.GET
                )

            # Create a new response with the content from the proxied request
            django_response = HttpResponse(
                content=response.content,
                status=response.status_code,
                content_type=response.headers.get('Content-Type')
            )

            # Add CORS headers
            django_response["Access-Control-Allow-Origin"] = "http://localhost:5173"
            django_response["Access-Control-Allow-Credentials"] = "true"

            return django_response
        except requests.RequestException as e:
            return JsonResponse({"error": str(e)}, status=500)

# # Create your views here.

# from rest_framework.views import APIView
# from rest_framework.response import Response
# from django.conf import settings
# import requests

# class GatewayView(APIView):
#     def dispath(self, request, *args, **kwargs):
#         servie = kwargs.get('service')
#         if servie == 'user':
#             base_url = settings.USER_SERVICE_URL
#         elif servie == 'article':
#             base_url = settings.ARTICLE_SERVICE_URL
#         else:
#             return Response({'error':"Invalid service"}, status=400)
        
#         path = kwargs.get('path', '')
#         url = f"{base_url}/api/{path}"
#         print(path)
#         print(url)

#         method = request.method.lower()
#         data = request.data
#         headers = {
#             'Authorization': request.headers.get('Authorization', ''),
#             'Content-Type': request.headers.get('Content-Type', 'application/json'),
#         }

#         try:
#             if method == 'get':
#                 response = requests.get(url, params=request.GET, headers=headers)
#             elif method in ['post', 'put', 'patch']:
#                 response = requests.request(method, url, json=data, headers=headers)
#             elif method == 'delete':
#                 response = requests.delete(url, headers=headers)
#             else:
#                 return Response({"error": "Method not allowed"}, status=405)

#             return Response(response.json(), status=response.status_code)
#         except requests.RequestException as e:
#             return Response({"error": str(e)}, status=500)
        
        
# from django.views import View
# from django.http import HttpResponse, JsonResponse
# from django.conf import settings
# import requests
# import json
# from django.core.files.uploadedfile import TemporaryUploadedFile

# class GatewayView(View):
#     def dispatch(self, request, *args, **kwargs):
#         print('iam here')
#         service = kwargs.get('service')
#         if service == 'user':
#             base_url = settings.USER_SERVICE_URL
#         elif service == 'article':
#             base_url = settings.ARTICLE_SERVICE_URL
#         else:
#             return JsonResponse({"error": "Invalid service"}, status=400)

#         path = kwargs.get('path', '')
#         url = f"{base_url}/api/{path}"

#         method = request.method.lower()
#         headers = {
#             'Authorization': request.headers.get('Authorization', ''),
#             'Content-Type': request.headers.get('Content-Type', 'application/json'),
#         }

#         try:
#             if method == 'options':
#                 response = HttpResponse()
#                 response["Access-Control-Allow-Origin"] = "*"
#                 response["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
#                 response["Access-Control-Allow-Headers"] = "Authorization, Content-Type"
#                 return response
#             else:
#                 files = {}
#                 data = {}
                
#                 if request.content_type == 'application/json':
#                     data = json.loads(request.body) if request.body else {}
#                 elif request.content_type == 'application/x-www-form-urlencoded':
#                     data = request.POST.dict()
#                 elif request.content_type.startswith('multipart/form-data'):
#                     data = request.POST.dict()
#                     for key, value in request.FILES.items():
#                         if isinstance(value, TemporaryUploadedFile):
#                             files[key] = (value.name, value.file, value.content_type)
                
#                 response = requests.request(
#                     method,
#                     url,
#                     data=data,
#                     files=files,
#                     headers=headers,
#                     params=request.GET
#                 )

#             # Create a new response with the content from the proxied request
#             django_response = HttpResponse(
#                 content=response.content,
#                 status=response.status_code,
#                 content_type=response.headers.get('Content-Type')
#             )

#             # Copy all headers from the proxied response
#             for header, value in response.headers.items():
#                 if header.lower() not in ['content-encoding', 'transfer-encoding', 'content-length']:
#                     django_response[header] = value

#             # Add CORS headers
#             django_response["Access-Control-Allow-Origin"] = "*"
#             django_response["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
#             django_response["Access-Control-Allow-Headers"] = "Authorization, Content-Type"

#             return django_response
#         except requests.RequestException as e:
#             return JsonResponse({"error": str(e)}, status=500)