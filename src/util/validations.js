export default {
    required: function (varname) {
        return v => !!v || varname + ' es requerido'
    },
    lenght: function (varlen) {
        return v =>
            v.length <= parseInt(varlen) ||
            'El texto debe ser menor a ' + varlen + ' caracteres'
    },
    numeric: function () {
        return v =>
            /[0-9]|[0-9]-[^A-C]/.test(v) ||
            'Favor de ingresar un número correcto Ejemplo: 175 o 175-A'
    },
    email: function () {
        return v => /.+@.+\..+/.test(v) || 'Ingrese una dirección de correo válida'
    },
    date: function () {
        return v =>
            /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(v) || 'Ingrese una fecha válida'
        // return v => /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/.test(v) || 'Ingrese una fecha válida'
    },
    password: function () {
        return v =>
            /(?=^.{8,15}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/.test(
                v,
            ) || 'La contraseña debe contener al menos 8 caracteres'
    },
    postalcode: function () {
        return v => /^\d{4,5}$/.test(v) || 'Codigo postal mexicano'
    },
}
