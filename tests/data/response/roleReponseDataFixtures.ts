import { ResponseApi } from "../../../src/app/interfaces/response-api.interface";
import { ResponseRoleInterface } from "../../../src/app/interfaces/response-role.interface";

export const RESPONSE_VALID_FIND_ROLE_JSON: ResponseApi<ResponseRoleInterface> =
{
    "success": true,
    "message": "Roles sucesso.",
    "data": [
        {
            "id": "0678790c-decd-476f-962b-783b71b220fd",
            "name": "Convidado",
            "description": "Acesso limitado, geralmente usado para visualizações ou ações temporárias."
        },
        {
            "id": "26c66e85-d274-410d-8eb5-362a82866de6",
            "name": "Editor",
            "description": "Pode criar, editar e publicar conteúdo, mas sem permissões administrativas."
        },
        {
            "id": "4b5f7c38-8f88-4328-98de-ed785a71d138",
            "name": "Suporte",
            "description": "Suporte técnico com acesso para solucionar problemas dos usuários."
        },
        {
            "id": "63993350-c555-4a5c-b5cd-92c4a9c02dac",
            "name": "Gerente",
            "description": "Gerencia equipes e recursos, com acesso restrito a funções administrativas."
        },
        {
            "id": "6f010e07-a837-42d0-b49a-91f0cd635796",
            "name": "Desenvolvedor",
            "description": "Acesso a ferramentas de desenvolvimento e recursos técnicos da aplicação."
        },
        {
            "id": "8fd55867-4c0a-4e30-a6cf-888175569c93",
            "name": "Usuário",
            "description": "Usuário padrão com acesso básico às funcionalidades da aplicação."
        },
        {
            "id": "91b55976-e590-4a5c-a882-a6b7221027cd",
            "name": "Administrador",
            "description": "Acesso total ao sistema, incluindo gerenciamento de usuários, permissões e configurações."
        },
        {
            "id": "be2dc81d-9178-4181-8919-62d544e36b26",
            "name": "Moderador",
            "description": "Responsável por revisar e moderar conteúdo gerado por outros usuários."
        }
    ]
};