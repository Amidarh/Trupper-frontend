'use client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Eye, EyeOff } from 'lucide-react';
import { Suspense, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAltStore } from '@/lib/zustand/userStore';
import { useKycComplete } from '@/modules/kyc-complete/services';
import { useEffect } from 'react';
import Image from 'next/image';

const SingupConLayout = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { organization } = useAltStore();

  const {
    signupConfirmationForm: {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
    },
    signupConfirmation,
    serverError,
    userDetails,
    kycDetailsLoading,
    getUserDetails,
  } = useKycComplete();

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <ScrollArea className='w-full'>
      <div className='flex pt-10 sm:items-center justify-center pb-12 w-full'>
        <Card className='w-full max-w-120 p-2 max-sm:bg-transparent border-none sm:border sm:p-8'>
          <div className='flex flex-col items-center justify-center mb-4'>
            {organization?.logo && (
              <Image
                src={organization.logo}
                height={40}
                width={40}
                className='rounded-lg mb-1'
                alt={`${organization.name} logo`}
              />
            )}
            <h2 className='text-2xl font-bold mb-1'>{organization?.name}</h2>
            <h2 className='text-md font-bold'>Account Setup</h2>
            <p className='text-center text-sm'>
              Complete your credentials below to access Your{' '}
              <b>{organization?.name}</b> Account
            </p>
            {serverError && (
              <p className='text-red-600 text-sm text-center'>{serverError}</p>
            )}
          </div>
          <form onSubmit={handleSubmit(signupConfirmation)}>
            <div className='mb-4'>
              <Label htmlFor='firstName' className='mb-2'>
                First Name
              </Label>
              <Input
                id='firstName'
                placeholder='Enter your first name'
                className='h-12'
                value={userDetails?.firstName}
                {...register('firstName')}
              />
            </div>
            <div className='mb-4'>
              <Label htmlFor='firstName' className='mb-2'>
                Last Name
              </Label>
              <Input
                id='firstName'
                placeholder='Enter your first name'
                className='h-12'
                value={userDetails?.lastName}
                {...register('lastName')}
              />
            </div>
            <div className='mb-4'>
              <Label htmlFor='firstName' className='mb-2'>
                Email
              </Label>
              <Input
                id='Email'
                placeholder='Enter your first name'
                className='h-12'
                disabled={true}
                value={userDetails?.email}
              />
            </div>
            <div className='mb-4'>
              <Label htmlFor='password' className='mb-2'>
                New Password
              </Label>
              <div className='relative'>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  id='password'
                  placeholder='Enter new password'
                  className='h-12 pr-10'
                  {...register('password')}
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer'
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className='text-red-500 text-sm'>
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className='mb-4'>
              <Label htmlFor='confirmPassword' className='mb-2'>
                Confirm Password
              </Label>
              <div className='relative'>
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id='confirmPassword'
                  placeholder='Confirm your password'
                  className='h-12 pr-10'
                  {...register('confirmPassword')}
                />
                <button
                  type='button'
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer'
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className='text-red-500 text-sm'>
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className='mt-6'>
              {kycDetailsLoading ? (
                <Button type='submit' className='w-full cursor-pointer h-10'>
                  Getting Data
                </Button>
              ) : (
                <Button type='submit' className='w-full cursor-pointer h-10'>
                  {isSubmitting ? 'Loading...' : 'Continue'}
                </Button>
              )}
            </div>

            <div className='mt-5 flex flex-col justify-center gap-5 items-center'>
              <Separator />
              <p className='text-center max-w-90 text-xs dark:text-gray-300 text-gray-800'>
                By creating this account you agree to all <b>Amidarh</b> terms
                and conditions @ {organization?.name} 2025
              </p>
            </div>
          </form>
        </Card>
      </div>
    </ScrollArea>
  );
};

export default function SingupConPage() {
  return (
    <Suspense fallback={<div>loaading...</div>}>
      <SingupConLayout />
    </Suspense>
  );
}
