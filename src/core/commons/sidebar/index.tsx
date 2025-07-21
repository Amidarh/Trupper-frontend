'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  PERMISSIONS,
  MENU_ITEMS,
  AppSidebarProps,
  MenuItem,
} from '../../constants/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuItem,
  SidebarMenu,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useAltStore } from '@/lib/zustand/userStore';
import { useRouter } from 'next/navigation';

export default function AppSidebar({ userRole, className }: AppSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAltStore((state) => state.user);
  const organization = useAltStore((state) => state.organization);
  typeof userRole === 'string';
  const allowedPermissions: string[] = userRole
    ? Array.from(
        PERMISSIONS[userRole as string as keyof typeof PERMISSIONS] || []
      )
    : [];
  const accessibleMenuItems = MENU_ITEMS.filter(
    (item) => item.permission !== null
  ).filter((item) => allowedPermissions.includes(item.permission as string));

  // Group menu items
  const groupedMenuItems = accessibleMenuItems.reduce(
    (groups, item) => {
      const group = groups[item.group] || [];
      group.push(item);
      groups[item.group] = group;
      return groups;
    },
    {} as Record<string, MenuItem[]>
  );

  const isActive = (href: string) => {
    // Base route check (e.g., /dashboard)
    if (href === pathname) return true;

    // Handle nested routes
    const baseRoute = href.split('/')[1]; // Get the first segment
    const currentRoute = pathname.split('/')[1];

    // If base routes match and href is not home
    if (baseRoute === currentRoute && href !== '/') return true;

    // If the current path starts with the href (for deeper nesting)
    if (pathname.startsWith(href) && href !== '/') return true;

    return false;
  };

  const formatGroupName = (name: string) => {
    const groupLabels: Record<string, string> = {
      overview: 'Overview',
      management: 'User Management',
      exams: 'Exam Management',
      communication: 'Communication',
      settings: 'System Settings',
    };
    return groupLabels[name] || name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <Sidebar className={`w-60 ${className || ''}`}>
      <SidebarHeader className='p-0 pl-5 cursor-pointer'
      onClick={() => router.push('/dashboard')}
      >
        {organization?.logo ? (
          <div className='flex flex-row items-center gap-1'>
            <Image
              src={organization.logo}
              height={40}
              width={40}
              className='rounded-lg mt-2'
              alt={`${organization.name} logo`}
            />
            <h1 className='text-xl mt-4'>{organization?.name}</h1>
          </div>
        ) : (
          <h1 className='text-xl mt-4'>{organization?.name}</h1>
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu
          className={cn(
            'p-3 flex flex-col gap-4',
            userRole?.toLowerCase() === 'user' && 'mt-5'
          )}
        >
          {Object.entries(groupedMenuItems).map(([group, items]) => (
            <div key={group} className='flex flex-col gap-1'>
              {userRole?.toLowerCase() !== 'user' && (
                <div className='px-2 mb-2'>
                  <span className='text-xs font-medium text-muted-foreground'>
                    {formatGroupName(group)}
                  </span>
                </div>
              )}
              {items.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild className='rounded-2xl'>
                    <Link
                      href={item.href}
                      className={`h-[40px] flex items-center gap-2 rounded-2xl px-2
                        ${
                          isActive(item.href)
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-accent hover:text-accent-foreground'
                        }`}
                    >
                      <item.icon className='h-5 w-5' />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </div>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className='border-t p-4'>
        <div className='flex items-center gap-2'>
          <Avatar className='h-8 w-8'>
            {user?.photo ? (
              <AvatarImage src={user?.photo} alt='User' />
            ) : (
              <AvatarFallback>
                {user?.firstName?.slice(0, 1)}
                {user?.lastName?.slice(0, 1)}
              </AvatarFallback>
            )}
          </Avatar>
          <div className='flex flex-col text-sm'>
            <span className='font-medium'>{user?.firstName}</span>
            <span className='text-xs text-muted-foreground'>{userRole}</span>
          </div>
          <Button variant='ghost' size='icon' className='ml-auto'>
            <LogOut className='h-4 w-4' />
            <span className='sr-only'>Log out</span>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
