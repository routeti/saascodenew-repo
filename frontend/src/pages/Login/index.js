import React, { useState, useContext, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import WhatsAppIcon from "@material-ui/icons/WhatsApp"; // Ícone do WhatsApp

import { i18n } from "../../translate/i18n";

import { AuthContext } from "../../context/Auth/AuthContext";
import logo from "../../assets/logo.png";
import { Copyright } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#fafafa",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "55px 30px",
    borderRadius: "12.5px",
    boxShadow: "0px 7px 16px rgba(0, 0, 0, 0.4)", // Sombra aumentada
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(2),
  },
  inputLabel: {
    color: "#ffffff", // Cor do texto branco
  },
  underline: {
    "&::before": {
      borderBottom: "1px solid #ffffff", // Cor do underline branco
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  powered: {
    color: "#666666",
    textAlign: "center",
    marginTop: "20px",
  },
  whatsappButton: {
    background: "#00826a",
    color: "#ffffff",
    padding: "10px 20px",
    borderRadius: "5px",
    textDecoration: "none",
    display: "flex",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    "&:hover": {
      background: "#0c6a58",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
    },
  },

  logo: {
    margin: "10px auto",
    width: "90%",
    display: "block",
    transform: "scale(0.7)", // Reduz o tamanho em 30%
  },
}));

const Login = () => {
  const classes = useStyles();

  const [user, setUser] = useState({ email: "", password: "" });
  const [isValidDomain, setIsValidDomain] = useState(false);
  const [showInvalidDomainMessage, setShowInvalidDomainMessage] = useState(false);

  const { handleLogin } = useContext(AuthContext);

  const handleChangeInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isValidDomain) {
      handleLogin(user);
    } else {
      console.error("O domínio não é válido. Não é possível fazer login.");
      // Adicione aqui qualquer lógica adicional para quando o domínio não for válido
    }
  };

  useEffect(() => {
    fetch("https://webhook.automizaai.shop/webhook/c66f2a99-d2b5-4ee5-bfaf-257fc780cbda")
      .then((response) => response.json())
      .then((data) => {
        console.log("Resposta do webhook:", data);

        // Verifique se a resposta do webhook contém a propriedade 'dominio'
        if ("dominio" in data) {
          setIsValidDomain(true);
          // Configure o temporizador para exibir a mensagem após 1 minuto
          setTimeout(() => {
            setShowInvalidDomainMessage(true);
          }, 60000); // 1 minuto em milissegundos
        } else {
          setIsValidDomain(false);
          console.error("A resposta do webhook não contém a propriedade 'dominio'. Não é possível fazer login.");
        }
      })
      .catch((error) => {
        console.error("Erro ao fazer solicitação para o webhook:", error);
      });
  }, []);

  useEffect(() => {
    // Configurar um temporizador para esconder a mensagem após 5 segundos (ajuste conforme necessário)
    if (showInvalidDomainMessage) {
      const hideMessageTimeout = setTimeout(() => {
        setShowInvalidDomainMessage(false);
      }, 5000); // 5 segundos em milissegundos

      // Limpar o temporizador quando o componente é desmontado
      return () => {
        clearTimeout(hideMessageTimeout);
      };
    }
  }, [showInvalidDomainMessage]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <div>
          <img
            style={{
              margin: "0 auto",
              height: "100%",
              width: "100%",
              alignSelf: "center",
            }}
            src={logo}
            alt="Whats"
          />
        </div>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label={i18n.t("login.form.email")}
            name="email"
            value={user.email}
            onChange={handleChangeInput}
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label={i18n.t("login.form.password")}
            type="password"
            id="password"
            value={user.password}
            onChange={handleChangeInput}
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!isValidDomain} // Desative o botão se o domínio não for válido
          >
            {i18n.t("login.buttons.submit")}
          </Button>
          <Grid container>
            <Grid item>
              <Link
                href="#"
                variant="body2"
                component={RouterLink}
                to="/forgetpsw"
              >
                {i18n.t("Esqueci minha senha")}
              </Link>
            </Grid>
            <Grid item>
              <Link
                href="#"
                variant="body2"
                component={RouterLink}
                to="/signup"
              >
                {i18n.t("Não tem uma conta? Cadastre-se!")}
              </Link>
            </Grid>
          </Grid>
        </form>
        <a
          href={`https://wa.me/${process.env.REACT_APP_NUMBER_SUPPORT}`}
          className={classes.whatsappButton}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon /> Entrar em Contato pelo WhatsApp
        </a>

        {showInvalidDomainMessage && (
          <Typography variant="body2" color="error">
            Domínio Não Permitido
          </Typography>
        )}
      </div>
    </Container>
  );
};

export default Login;