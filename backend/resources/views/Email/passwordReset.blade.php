<x-mail::message>
# Change password Request

Click on the link to reset password

<x-mail::button :url="'http://localhost:4200/response-password-reset?token='.$token">
Reset Password
</x-mail::button>

Click on the link to reset password




Thanks,<br>
{{ config('app.name') }}
</x-mail::message>


