import { Component, HostListener, OnDestroy } from '@angular/core';

interface ProfileMenuAction {
  label: string;
  iconName: string;
}

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html'
})
export class ProfileMenuComponent implements OnDestroy {
  protected readonly profileUser = {
    name: 'Nyan Min Htet',
    identifier: 'nyanminhtet@gmail.com',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=128&q=80'
  };

  protected readonly accountActions: ProfileMenuAction[] = [
    { label: 'View Profile', iconName: 'user' },
    { label: 'Orders', iconName: 'package' },
    { label: 'Wishlist', iconName: 'heart' },
    { label: 'Settings', iconName: 'settings' }
  ];

  protected isOpen = false;

  private closeTimer: ReturnType<typeof setTimeout> | null = null;

  ngOnDestroy(): void {
    this.clearCloseTimer();
  }

  protected openMenu(): void {
    this.clearCloseTimer();
    this.isOpen = true;
  }

  protected toggleMenu(): void {
    this.clearCloseTimer();
    this.isOpen = !this.isOpen;
  }

  protected scheduleClose(): void {
    this.clearCloseTimer();
    this.closeTimer = setTimeout(() => {
      this.isOpen = false;
      this.closeTimer = null;
    }, 170);
  }

  protected cancelClose(): void {
    this.clearCloseTimer();
  }

  protected closeMenu(): void {
    this.clearCloseTimer();
    this.isOpen = false;
  }

  protected handleAction(action: ProfileMenuAction): void {
    console.info(`Profile menu action requested: ${action.label}`);
    this.closeMenu();
  }

  protected handleLogout(): void {
    console.info('Profile menu action requested: Log Out');
    this.closeMenu();
  }

  @HostListener('document:click')
  protected handleDocumentClick(): void {
    this.closeMenu();
  }

  @HostListener('document:keydown.escape')
  protected handleEscape(): void {
    this.closeMenu();
  }

  private clearCloseTimer(): void {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
  }
}
