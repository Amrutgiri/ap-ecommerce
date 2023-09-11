<?php

namespace App\Http\Requests\Admin\User;

use Illuminate\Foundation\Http\FormRequest;

class UserUpdateRequest extends FormRequest
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
            'phone' => 'required|numeric|digits:10|regex:/^([1-9\s\-\+\(\)][0-9]{5,15})$/|unique:users,phone,' . $this->user->id,
            'email' => 'required|min:2|max:70|email|unique:users,email,' . $this->user->id,
            'profile' => 'nullable|mimes:jpeg,png,jpg,svg,heic|max:51200',
            'address' => 'required',
            /* 'password' => 'nullable|min:8|max:15|confirmed',
            'password_confirmation' => 'nullable|min:8|max:15', */
            'state_id' => 'required',
            'city_id' => 'required',
            'zipcode' => 'required|digits:5',
        ];
    }
    public function messages(): array
    {
        return [
            'state_id.required' => 'The state field is required.',
            'city_id.required' => 'The city field is required.',
            'phone.required' => 'The mobile number field is required',
            'phone.regex' => 'The mobile number format is invalid.',
            'phone.numeric' => 'The mobile number must be a number.',
            'phone.digits' => 'Please enter 10 digit valid mobile number',
            'phone.unique' => 'The mobile number has already been taken.',
            'profile.max' => 'The profile image must not be greater than 50 MB.',
        ];
    }
}
