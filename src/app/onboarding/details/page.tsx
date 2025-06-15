'use client';

import { useEffect, useState } from 'react';
// import { PhoneInput } from "@/core/commons/components/input/phone"
// import { ChevronLeft } from "lucide-react"
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import ImageUpload from '@/core/commons/components/imageUpload';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useAltStore } from '@/lib/zustand/userStore';
import { Button } from '@/components/ui/button';
import { useOnboardingService } from '@/modules/onBoarding/services';
import { PhoneInput, CountrySelect } from '@/core/commons/components/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { staffRange, usersRange } from '@/constants/onboarding';
import { BackButton } from '@/core/commons/navigation/backButton';
import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
  const router = useRouter();
  const organization = useAltStore((state) => state.organization);
  const [selectedStaffRange, setSelectedStaffRange] = useState<
    string | undefined
  >(undefined);
  const [selectedUsersRange, setSelectedUserRange] = useState<
    string | undefined
  >(undefined);

  const {
    organizationDetailsForm: {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      setValue,
    },
    organizationDetails,
    serverError,
  } = useOnboardingService();

  useEffect(() => {
    if (organization && organization?.isOnboarded) {
      router.push('/login');
    }
  }, [organization]);

  return (
    <div className='lg:px-10 px-4 py-5'>
      <div>
        <p>
          <b className='text-xl'>Trupper</b> by <i>Amidarh</i>
        </p>
      </div>
      <main className=' py-1 w-full flex flex-row gap-2'>
        <section className='w-full lg:max-w-xl'>
          <Progress value={90} className='w-full my-2' />
          <BackButton title='back' />
          <div className='mt-4 flex flex-col gap-3'>
            <h1 className='text-3xl font-semibold '>
              Let&apos;s Know your Organization
            </h1>
            {serverError && (
              <p className='text-red-500 text-sm'>{serverError}</p>
            )}
            <p>
              Let’s get to know your organization! A few quick questions now
              means a smoother, smarter experience for you and your users later.
            </p>
          </div>

          <form onSubmit={handleSubmit(organizationDetails)}>
            <div className='mt-5 gap-1'>
              <Label>Organization description</Label>
              <Textarea
                placeholder='Describe your organization your way'
                className='mt-2'
                {...register('description')}
              />
              {errors.description && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className='mt-5 gap-1'>
              <Label>Organization mobile no</Label>
              <PhoneInput
                className='mt-2'
                onChange={(e) => {
                  console.log(e);
                  setValue('phone', e, { shouldValidate: true });
                }}
              />
              {errors.phone && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className='mt-5 gap-1'>
              <Label>Organization Location</Label>
              <div className='mt-2'>
                <CountrySelect
                  onChange={(e) => {
                    console.log({ e });
                    setValue('country', e.name, { shouldValidate: true });
                  }}
                />
              </div>
            </div>

            <div className='mt-4'>
              <Label htmlFor='user range' className='mb-1'>
                Your user range
              </Label>
              <Select
                onValueChange={(value) => {
                  setSelectedUserRange(value);
                  setValue('usersRange', value, { shouldValidate: true });
                }}
                value={selectedUsersRange}
              >
                <SelectTrigger className='w-full h-12'>
                  <SelectValue placeholder='Select your users range' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {usersRange.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.value}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.usersRange && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.usersRange.message}
                </p>
              )}
            </div>

            <div className='mt-4'>
              <Label htmlFor='user range' className='mb-1'>
                Your staff range
              </Label>
              <Select
                onValueChange={(value) => {
                  setSelectedStaffRange(value);
                  setValue('staffRange', value, { shouldValidate: true });
                }}
                value={selectedStaffRange}
              >
                <SelectTrigger className='w-full h-12'>
                  <SelectValue placeholder='Select your users range' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {staffRange.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.value}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.staffRange && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.staffRange.message}
                </p>
              )}
            </div>

            <Button className='mt-5' type='submit' disabled={isSubmitting}>
              {isSubmitting ? 'Loading...' : 'Finish'}
            </Button>
          </form>
        </section>

        <section className='max-lg:hidden'>
          <main className='border w-full h-screen fixed top-20 left-[45%] right-0 rounded-lg shadow-lg'>
            <div className='p-4 bg-gray-50 dark:bg-gray-800 rounded-t-lg'>
              <div className='flex flex-row gap-2'>
                <div className='size-5 bg-gray-400 rounded-full cursor-pointer' />
                <div className='size-5 bg-gray-400 rounded-full cursor-pointer' />
                <div className='size-5 bg-gray-400 rounded-full cursor-pointer' />
              </div>
            </div>
            <Separator />

            <div className='flex flex-col gap-5 p-4'>
              <div className='flex flex-row items-center gap-3'>
                <ImageUpload
                  placeholder='Upload Logo'
                  disabled={true}
                  value={organization?.logo}
                />
                <h1 className='text-4xl'>{organization?.name}</h1>
              </div>
            </div>
            <Separator />
          </main>
        </section>
      </main>
    </div>
  );
}
