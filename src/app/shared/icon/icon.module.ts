import { NgModule } from '@angular/core';
import {
  AlertTriangle,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CreditCard,
  Heart,
  Instagram,
  Layers,
  LucideAngularModule,
  Menu,
  MessageCircle,
  Music2,
  LogOut,
  Minus,
  Package,
  Plus,
  Search,
  Send,
  Settings,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  SlidersHorizontal,
  Sparkles,
  Star,
  Trash2,
  Truck,
  User,
  X,
  Youtube
} from 'lucide-angular';

@NgModule({
  imports: [
    LucideAngularModule.pick({
      ArrowRight,
      AlertTriangle,
      ChevronLeft,
      ChevronRight,
      ChevronUp,
      CreditCard,
      Heart,
      Instagram,
      Layers,
      Menu,
      MessageCircle,
      Music2,
      LogOut,
      Minus,
      Package,
      Plus,
      Search,
      Send,
      Settings,
      ShieldCheck,
      ShoppingBag,
      ShoppingCart,
      SlidersHorizontal,
      Sparkles,
      Star,
      Trash2,
      Truck,
      User,
      X,
      Youtube
    })
  ],
  exports: [
    LucideAngularModule
  ]
})
export class IconModule { }
