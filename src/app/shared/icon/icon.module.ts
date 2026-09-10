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
  LucideAngularModule,
  Menu,
  MessageCircle,
  Music2,
  Search,
  Send,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  SlidersHorizontal,
  Sparkles,
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
      Menu,
      MessageCircle,
      Music2,
      Search,
      Send,
      ShieldCheck,
      ShoppingBag,
      ShoppingCart,
      SlidersHorizontal,
      Sparkles,
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
