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
			experience: {
				summary: `
Experiência no desenvolvimento de APIs RESTful, webhooks e worker services utilizando .NET Core, .NET 5, .NET 6, Node.js e ASP.NET MVC.
Arquitetura de software, utilizando Domain-Driven Design (DDD), Test-Driven Development (TDD) e princípios de código limpo, assegurando a manutenibilidade e escalabilidade das aplicações.
Desenvolvimento e gerenciamento de pacotes NuGet personalizados para reutilização de código e modularidade em múltiplos projetos.
Implementação de aplicações em tempo real com WebSockets e SignalR.
Sólida experiência na criação de imagens Docker e na containerização de aplicações.
Amplo conhecimento em sistemas de mensageria e brokers de mensagens, como RabbitMQ, Azure Service Bus e Google Pub/Sub.
Embora design não seja meu foco principal, tenho experiência no desenvolvimento de aplicações com Angular, Vue2, Vue3.
        `,
			},
		},
	},
};
