# AppHotel

Aplicativo mobile (Expo/React Native) para reserva de hoteis com fluxo completo de autenticacao, busca, reserva e pagamento.

## Funcionalidades
- Cadastro e login de usuarios
- Listagem de hoteis disponiveis
- Reserva com selecao de check-in e check-out
- Pagamento via WebView e tela de confirmacao
- Perfil do usuario com logout

## Stack
- Expo + React Native
- React Navigation (stack)
- Axios
- AsyncStorage

## Requisitos
- Node.js (LTS recomendado)
- Expo CLI
- Backend da API em execucao

## Configuracao da API
O app aponta para um backend local em `src/services/api.js`:

```
const API_URL = 'http://192.168.0.108:5000/api';
```

Atualize o IP/porta conforme o seu ambiente (emulador, dispositivo fisico ou servidor remoto).

## Como rodar
Instale dependencias:

```
npm install
```

Inicie o projeto:

```
npm start
```

Outros comandos:
- `npm run android`
- `npm run ios`
- `npm run web`

## Fluxo de telas
- Login / Cadastro
- Listagem de hoteis
- Reserva (check-in e check-out)
- Pagamento
- Confirmacao de pagamento
- Perfil

## Estrutura de pastas
```
src/
  components/
  context/
  navigation/
  screens/
  services/
```

## Observacoes
- Autenticacao usa token salvo no AsyncStorage.
- As rotas da API esperadas incluem: `/users/register`, `/users/login`, `/hotels`, `/bookings/add`, `/payments/checkout`, `/profile`.
