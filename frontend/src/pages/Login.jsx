import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'; // Asumo que usas react-hook-form

function LoginPage() {
    const { signin, isAuthenticated, errors } = useAuth();
    const navigate = useNavigate();
    // Configuración para manejar el formulario
    const { register, handleSubmit, formState: { errors: formErrors } } = useForm(); 

    // 1. Lógica de Redirección (CLAVE)
    useEffect(() => {
        if (isAuthenticated) {
            // Redirige a la página principal (donde verás los productos)
            navigate('/'); 
        }
    }, [isAuthenticated, navigate]);


    const onSubmit = handleSubmit(async (data) => {
        try {
            await signin(data);
            // El useEffect se encarga de la redirección al ser exitoso
        } catch (error) {
            // El error ya se maneja y guarda en el AuthContext
        }
    });

    return (
        <div className="uk-container uk-margin-large-top">
            <div className="uk-grid-margin uk-child-width-1-2@m uk-flex-center" data-uk-grid>
                <div className="uk-width-large">
                    <div className="uk-card uk-card-default uk-card-body uk-box-shadow-large">
                        <h3 className="uk-card-title uk-text-center">Iniciar Sesión</h3>
                        
                        {/* Muestra los errores del AuthContext */}
                        {errors.map((error, i) => (
                            <div key={i} className="uk-alert-danger" data-uk-alert>
                                <a className="uk-alert-close" data-uk-close></a>
                                <p>{error}</p>
                            </div>
                        ))}

                        {/* Formulario de Login */}
                        <form onSubmit={onSubmit}>
                            <div className="uk-margin">
                                <label className="uk-form-label" htmlFor="email">Correo Electrónico</label>
                                <div className="uk-form-controls">
                                    <input 
                                        className="uk-input" 
                                        id="email" 
                                        type="email" 
                                        placeholder="ej. kevin@mail.com" 
                                        {...register("email", { required: true })}
                                    />
                                    {formErrors.email && <span className="uk-text-danger uk-text-small">Campo requerido</span>}
                                </div>
                            </div>

                            <div className="uk-margin">
                                <label className="uk-form-label" htmlFor="password">Contraseña</label>
                                <div className="uk-form-controls">
                                    <input 
                                        className="uk-input" 
                                        id="password" 
                                        type="password" 
                                        placeholder="••••••••" 
                                        {...register("password", { required: true })}
                                    />
                                    {formErrors.password && <span className="uk-text-danger uk-text-small">Campo requerido</span>}
                                </div>
                            </div>

                            <button className="uk-button uk-button-primary uk-width-1-1 uk-margin-top" type="submit">
                                Entrar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;