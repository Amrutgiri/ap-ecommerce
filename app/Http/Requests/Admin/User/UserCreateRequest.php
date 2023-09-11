<?php

namespace App\Http\Requests\Admin\User;

use Illuminate\Foundation\Http\FormRequest;

class UserCreateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'full_name' => 'required|min:2|max:35',
            'phone' => 'required|numeric|digits:10|regex:/^([1-9\s\-\+\(\)][0-9]{5,15})$/|unique:users,phone,',
            'email' => 'required|min:2|max:70|email|unique:users,email' . $this->email,
            'profile' => 'nullable|mimes:jpeg,png,jpg,svg,heic|image|max:51200',
            'address' => 'required',
            'password' => 'required|min:8|max:15|confirmed',
            'password_confirmation' => 'required|min:8',
            'zipcode' => 'required|digits:5',
        ];
    }
    /**
     * @return array|string[]
     */
    public function messages(): array
    {
        return [

            'phone.required' => 'The mobile number field is required',
            'phone.regex' => 'Please enter valid mobile number.',
            'phone.numeric' => 'The mobile number must be a number.',
            'phone.digits' => 'Please enter 10 digit valid mobile number',
            'profile.max' => 'The profile image must not be greater than 50 MB.',
            'phone.unique' => 'The mobile number has already been taken.',
        ];
    }
}
