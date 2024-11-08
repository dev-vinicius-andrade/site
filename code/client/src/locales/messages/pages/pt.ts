import { LocaleMessagesPages } from '@/types/locale/pages';

export const messages: LocaleMessagesPages = {
	pages: {
		notFound: {
			title: 'Não Encontrado',
			message: 'Desculpe, a página que você está procurando não pôde ser encontrada.',
			route: 'Rota: {route}',
		},
		login: {
			headline: 'Bem-vindo ao portal do desenvolvedor hiperstream',
			description: 'Faça login para continuar no portal do desenvolvedor.',
			button: 'Login',
			callback: {
				error: {
					title: 'Erro de autenticação',
					details: 'Ocorreu um erro ao tentar autenticá-lo. Por favor, tente novamente.\n{error}',
					goToLoginButtonText: 'Login',
				},
			},
			disabledLoginAlert: {
				title: 'Login desabilitado',
				message: 'O login está desabilitado. Motivo: {reason}',
				reasons: {
					configurationsNotLoaded: 'As configurações não foram carregadas corretamente.',
				},
				reloadButtonText: 'Recarregar configurações',
			},
		},
		forbidden: {
			title: 'Proibido',
			description: 'Você não tem permissão para acessar esta página',
			goToHomeButtonText: 'Ir para a página inicial',
		},
		home: {
			headline: 'Olá, {name}!',
			description: 'Selecione uma api no combobox abaixo para obter a documentação do swagger',
			tokenHeadLine:
				'Como você está autenticado, ele usará seu token de autenticação para obter a documentação do swagger e outras solicitações.',
			tokenLabel: 'Seu token atual',
			renewTokenButton: 'Renovar token',
			tokenExpiresIn: 'O token expira em {expiresIn}',
		},
		user: {
			revokePermission: 'Revogar Permissão',
			addPermission: 'Adicionar Permissão',
		},
	},
};
