// src/components/auth/LoginForm.tsx
'use client'

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { loginStart, loginSuccess, loginFailure } from '@/Data/slices/authSlice'
import { RootState } from '@/Data'

interface LoginFormProps {
  userType: 'buyer' | 'vendor' | 'admin'
}

export const LoginForm: React.FC<LoginFormProps> = ({ userType }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { isLoading, error } = useSelector((state: RootState) => state.auth)
  
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  })
  const [show2FA, setShow2FA] = useState<boolean>(false)
  const [twoFACode, setTwoFACode] = useState<string>('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!credentials.email || !credentials.password) {
      dispatch(loginFailure('Veuillez remplir tous les champs'))
      return
    }

    try {
      dispatch(loginStart())
      
      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Ici, nous appellerons l'API Django
      console.log('Connexion avec:', credentials)
      
      // Simulation de réponse
      const mockUser = {
        id: '1',
        email: credentials.email,
        userType: userType,
        isVerified: true
      }
      
      dispatch(loginSuccess({ 
        user: mockUser, 
        token: 'mock-jwt-token' 
      }))
      
      // Redirection basée sur le type d'utilisateur
      if (userType === 'vendor') {
        setShow2FA(true) // 2FA pour les vendeurs
      } else {
        router.push('/dashboard')
      }
    } catch (err) {
      dispatch(loginFailure('Email ou mot de passe incorrect'))
    }
  }

  const handle2FASubmit = async () => {
    // Logique de vérification 2FA
    console.log('Code 2FA soumis:', twoFACode)
    router.push('/vendor-dashboard')
  }

  const handleForgotPassword = () => {
    console.log('Mot de passe oublié pour:', credentials.email)
    // Redirection vers la page de réinitialisation
  }

  if (show2FA) {
    return (
      <div style={{ 
        maxWidth: '400px', 
        margin: '0 auto', 
        padding: '24px',
        border: '1px solid #e5e7eb',
        borderRadius: '8px'
      }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
          Vérification en 2 étapes
        </h2>
        <p style={{ marginBottom: '16px' }}>
          Entrez le code de votre application d'authentification
        </p>
        <input
          type="text"
          value={twoFACode}
          onChange={(e) => setTwoFACode(e.target.value)}
          placeholder="Code à 6 chiffres"
          style={{
            width: '100%',
            padding: '8px 12px',
            marginBottom: '16px',
            border: '1px solid #d1d5db',
            borderRadius: '4px'
          }}
        />
        <button
          onClick={handle2FASubmit}
          style={{
            width: '100%',
            padding: '12px 24px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Vérifier
        </button>
      </div>
    )
  }

  return (
    <div style={{ 
      maxWidth: '400px', 
      margin: '0 auto', 
      padding: '24px',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
        Connexion {userType === 'vendor' ? 'Vendeur' : 'Acheteur'}
      </h2>
      
      <p style={{ marginBottom: '24px', color: '#6b7280' }}>
        Accédez à votre compte
      </p>

      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '16px' }}>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleInputChange}
            placeholder="Adresse email"
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '4px'
            }}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            placeholder="Mot de passe"
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '4px'
            }}
          />
        </div>

        {error && (
          <div style={{ 
            color: '#ef4444', 
            marginBottom: '16px',
            padding: '8px',
            backgroundColor: '#fef2f2',
            borderRadius: '4px'
          }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: '100%',
            padding: '12px 24px',
            backgroundColor: isLoading ? '#9ca3af' : '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            marginBottom: '12px'
          }}
        >
          {isLoading ? 'Connexion...' : 'Se connecter'}
        </button>

        <button
          type="button"
          onClick={handleForgotPassword}
          style={{
            width: '100%',
            padding: '8px 16px',
            backgroundColor: 'transparent',
            color: '#3b82f6',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Mot de passe oublié ?
        </button>
      </form>
    </div>
  )
}