import { ThemeProvider } from 'styled-components'
// import { Button } from "./components/Button";
import { defaultTheme } from './styles/theme/default';
import { GlobalStyle } from './styles/global';
import { BrowserRouter } from 'react-router-dom'
import { Router } from './components/Router';
import { ButtonUseEffect } from './components/ExemploUseEffect';
// import { HomeTemp } from './HomeTemp';

export function App() {
  // return <HomeTemp />
  return (
    <ThemeProvider theme={defaultTheme}>
      {/* <Button variant="primary" />
      <Button variant="secondary" />
      <Button variant="danger" />
      <Button variant="success" />
      <Button /> */}
      {/* <ButtonUseEffect /> */}
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
}

