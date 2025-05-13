import { LocaleMessagesPages } from '@/types/locale/pages';
export const messages: LocaleMessagesPages = {
	pages: {
		notFound: {
			title: 'Not Found',
			message: 'Sorry, the page you are looking for could not be found.',
			route: 'Route: {route}',
		},
		login: {
			headline: 'Welcome',
			headLineAppend: 'to',
			description: 'Please login to continue.',
			button: 'Login',
			callback: {
				error: {
					title: 'Authentication error',
					details: 'An error occurred while trying to authenticate you. Please try again.\n{error}',
					goToLoginButtonText: 'Login',
				},
			},
			disabledLoginAlert: {
				title: 'Login disabled',
				message: 'Login is disabled. Reason: {reason}',
				reasons: {
					configurationsNotLoaded: 'Configurations did not loaded properly.',
				},
				reloadButtonText: 'Reload configurations',
			},
		},
		forbidden: {
			title: 'Forbidden',
			description: 'You do not have permission to access this page',
			goToHomeButtonText: 'Go to home',
		},
		home: {
			headline: 'Hello, {name}!',
			description: 'Select an api in the combobox bellow to get the swagger documentation',
			tokenHeadLine:
				'As you are authenticated, it will use your authentication token to get the swagger documentation and further requests.',
			tokenLabel: 'Your current token',
			renewTokenButton: 'Renew token',
			tokenExpiresIn: 'Token expires in {expiresIn}',
		},
	},
};
