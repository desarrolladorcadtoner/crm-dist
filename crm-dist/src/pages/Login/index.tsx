import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Button } from "primereact/button";
import { login } from "@/api/auth";

export default function Login() {
  const [usuario, setUsuario] = useState<string>(""); // Cambiar a string
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  

  const handleLogin = async () => {
    if (!usuario || !password) {
      setError("Por favor, ingresa tu usuario y contraseña.");
      return;
    }

    try {
      setError(null); // Limpiar errores previos
      //console.log("Enviando datos:", { usuario, password });
      const response = await login(usuario, password);
      console.log("Respuesta del servidor:", response);

      // Redirigir al home
      console.log("Redirigiendo a /home...");
      router.push("/home");
    } catch (err: any) {
      console.error("Error al iniciar sesión:", err);
      setError(err.message);
    }
  };

  return (
    <>
      {/* Div background con posición absoluta */}

      <div className="container min-w-screen min-h-screen flexjustify-center items-center bg-gradient-to-br from-[#0b4468] to-[#0072b1] 
        flex flex-col justify-center items-center">
        <Image
          src="/images/Background_cadToner.png"
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="absolute top-0 left-0 w-full h-full opacity-20 z-0"
        />

        {/* Div boxLogin */}
        <div className="boxLogin relative w-[900px] h-[600px] shadow-xl rounded-xl bg-white flex flex-row justify-center items-center z-10">
          <div className="imageCadToner rounded-tl-lg rounded-bl-lg w-[500px] h-full flex justify-center items-center bg-gradient-to-br from-[#0b4468] to-[#0072b1]">
            <Image
              src="/images/logo-cadtoner.png"
              alt="Logo"
              width={250}
              height={250}
              className="rounded-tl-lg rounded-bl-lg"
            />
          </div>

          <div className="formLogin w-[400px] h-full flex flex-col justify-center items-center">
            <h1 className="mb-8 text-3xl">USER LOGIN</h1>
            {error && <p className="text-red-500 mb-6">{error}</p>}
            <div className="inputs flex flex-col h-56">
              <label htmlFor="usuario" className="mb-2">Usuario</label>
              <input
                id="usuario"
                value={usuario}
                placeholder="Usuario"
                onChange={(e) => setUsuario(e.target.value)}
                className="p-inputtext p-component w-[250px]"
              />

              <label htmlFor="password" className="mb-2 mt-6">Password</label>
              <input
                id="Password"
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-inputtext p-component w-[250px]"
              />
              <a href="/forgottenPassword" className="ml-24 text-xs text-cyan-400 underline">Olvidaste tu contraseña?</a>
            </div>
            
            
            <Button label="Login" onClick={handleLogin} /> {/*onClick={handleLogin}*/}
          </div>
        </div>
      </div>


    </>

  );
}
