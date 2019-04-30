import { toast } from 'react-toastify'

export const defaultSuccess = (payload) => {
    toast.success(!payload.msg ? 'Operação realizada com sucesso.' : payload.msg, 'success', {
        autoclose: 2000
    })
}

export const defaultError = (payload) => {
    toast.error(!payload.msg ? 'Oops... Erro inesperado.' : payload.msg, 'error', {
        autoclose: 2000
    })
}