import { LucideIcon } from 'lucide-react'

export interface NavItem {
  id: number
  title: string
  icon: LucideIcon
}

export interface Installation {
  title: string
  location: string
  description: string
  imageUrl: string
  videoUrl?: string
  jumpTypes: Array<'vertical' | 'oxer' | 'liverpool' | 'wall'>
  year: number
}

export interface Product {
  id: string
  name: string
  description: string
  icon: LucideIcon
  features: string[]
  imageUrl: string
}

export interface Competition {
  id: number
  name: string
  location: string
  date: string
  type: 'National' | 'International' | 'Regional'
  level: string
  participants: number
  coordinates: [number, number] // [latitude, longitude]
}

export interface JumpElement {
  id: number
  x: number
  y: number
  type: 'vertical' | 'oxer' | 'liverpool' | 'wall'
  rotation: number
}

export interface Position {
  x: number
  y: number
}

export interface RequestFormData {
  name: string
  email: string
  phone: string
  facility: string
  jumpTypes: string[]
  quantity: string
  customization: string
  timeline: string
  budget: string
  additionalInfo: string
}
