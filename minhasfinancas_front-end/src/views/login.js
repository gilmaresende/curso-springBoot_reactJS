import React from "react";
import Card from "../components/card";
import FormGroup from "../components/form-group";
import { withRouter } from "react-router-dom";
import axios from "axios";

class Login extends React.Component {
  state = {
    email: "",
    senha: "",
    mensagemErro: null,
  };

  prepareCadastrar = () => {
    this.props.history.push("/cadastro-usuario");
  };

  entrar = () => {
    axios
      .post("http://localhost:8080/api/usuario/autenticar", {
        email: this.state.email,
        senha: this.state.senha,
      })
      .then((response) => {
        this.props.history.push("/home");
      })
      .catch((erro) => {
        this.setState({ mensagemErro: erro.response.data });
      });
  };

  render() {
    return (
      <div className="row">
        <div
          className="col-md-6"
          style={{ position: "relative", left: "300px" }}
        >
          <div className="bs-docs-section">
            <Card title="Login">
              <div className="row">
                <span>{this.state.mensagemErro}</span>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="bs-component">
                    <fieldset>
                      <FormGroup label="E-mail *" htmlFor="exampleInputEmail1">
                        <input
                          value={this.state.email}
                          onChange={(e) =>
                            this.setState({ email: e.target.value })
                          }
                          type="email"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Digite seu e-mail"
                        ></input>
                      </FormGroup>
                      <FormGroup
                        label="Senha *"
                        htmlFor="exampleInputPassword1"
                      >
                        <input
                          value={this.state.senha}
                          onChange={(e) =>
                            this.setState({ senha: e.target.value })
                          }
                          type="password"
                          className="form-control"
                          id="exampleInputPassword1"
                          placeholder="Password"
                        ></input>
                      </FormGroup>
                      <button className="btn btn-success" onClick={this.entrar}>
                        Entrar
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={this.prepareCadastrar}
                      >
                        Cadastrar
                      </button>
                    </fieldset>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
