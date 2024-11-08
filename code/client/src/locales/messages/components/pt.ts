import { LocaleMessagesComponents } from '@/types/locale/messages/components';

export const messages: LocaleMessagesComponents = {
	components: {
		confirmationDialog: {
			title: "@:{'templates.areYouSure'}",
			text: "@:{'templates.areYouSureYouWantToProceed'}",
		},
		biography: {
			about: 'Desenvolvedor Full Stack com experiência em desenvolvimento de sites, apis, background services escaláveis.',
		},
		about: {
			professionalRole: `Experiente em design, arquitetura, desenvolvimento, análise e implementação de aplicações client-server, web e desktop.
Especialista em design de sistemas, além de testes, depuração e modificação de código de aplicações.
Sempre disposto a aprender novas linguagens e tecnologias de programação.
Experiência em resolver problemas complexos, gerenciar projetos de desenvolvimento, criar documentação técnica e tomar decisões estratégicas que impactam positivamente os resultados das equipes e das soluções entregues.
      `,
			experienceTotals: {
				yearsOfExperience: 'Anos de Experiência',
				softwareEngineer: 'Engenheiro de Software',
				fullStackDeveloper: 'Desenvolvedor Full Stack',
				softwareArchitecture: 'Arquitetura de Software',
				knownProgramingLanguages: 'Linguagens de Programação Conhecidas',
				freelanceProjects: 'Projetos Freelance',
			},
		},
	},
};
