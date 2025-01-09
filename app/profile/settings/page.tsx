'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Tabs from '@/components/ui/tabs'
import { Switch } from '@mui/material'
import SubMenu from '@/components/ui/sidebar/sub-menu'

export default function ConfiguracionPerfil() {
  const [nombre, setNombre] = useState('Usuario Ejemplo')
  const [foto, setFoto] = useState('/placeholder.svg?height=100&width=100')

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFoto(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const tabs = [
    {
      id: "general",
      label: "General",
      children: (
        <div className="space-y-6 p-6">
          <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
            <Label htmlFor="tema-oscuro" className="text-gray-700">Tema Oscuro</Label>
            <Switch id="tema-oscuro" color="primary" />
          </div>
          <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
            <Label htmlFor="idioma" className="text-gray-700">Idioma</Label>
            <select id="idioma" className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:ring-[#142F62] focus:border-[#142F62]">
              <option value="es">Español</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      ),
    },
    {
      id: "privacidad",
      label: "Privacidad",
      children: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="perfil-publico">Perfil Público</Label>
            <Switch id="perfil-publico" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="mostrar-email">Mostrar Email</Label>
            <Switch id="mostrar-email" />
          </div>
        </div>
      ),
    },
    {
      id: "notificaciones",
      label: "Notificaciones",
      children: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="notif-email">Notificaciones Email</Label>
            <Switch id="notif-email" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="notif-push">Notificaciones Push</Label>
            <Switch id="notif-push" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky h-16 bg-gray-200">
        <SubMenu isOpen={false} aside={false} />
      </header>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#142F62] via-[#001944] to-[#575E71] rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-white">Configuración de Perfil</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Panel lateral */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex flex-col items-center">
                <Image
                  className="h-32 w-32 object-cover rounded-full border-4 border-[#142F62]"
                  src={foto}
                  alt="Foto de perfil"
                  width={128}
                  height={128}
                />
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFotoChange}
                  className="mt-4 w-full"
                />
                <div className="mt-4 w-full">
                  <Label htmlFor="nombre" className="text-gray-600">Nombre</Label>
                  <Input
                    type="text"
                    id="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Panel principal */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg">
              <Tabs tabs={tabs} children={null} />
            </div>
            <div className="mt-6 flex justify-end">
              <Button className="bg-[#142F62] text-white hover:bg-[#001944] px-6">
                Guardar Cambios
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

