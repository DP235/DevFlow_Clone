"use client";

import React from 'react'
import AuthForm from "@/components/forms/AuthForm"
import { SignInSchema } from '@/lib/validation'
import { SignInWithCredentials } from '@/lib/actions/auth.action';

const SignIn = () => {
  return (
    <AuthForm 
      formType="SIGN_IN" 
      schema={SignInSchema}
      defaultValues={{ email: '', password: '' }}
      onSubmit={SignInWithCredentials}
    />
  )
}

export default SignIn