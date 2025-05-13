import { LocaleMessagesComponents } from '@/types/locale/messages/components';

export const messages: LocaleMessagesComponents = {
	components: {
		confirmationDialog: {
			title: "@:{'templates.areYouSure'}",
			text: "@:{'templates.areYouSureYouWantToProceed'}",
		},
		biography: {
			about: 'Full Stack Developer with experience in developing scalable websites, apis, background services.',
		},
		about: {
			professionalRole: `Extensive experience in designing, architecting, and implementing robust client-server, web, and
desktop applications. Skilled in system design, testing, debugging, and code refinement.
Proficient in adapting to new technologies and programming languages with a strong foundation in
problem-solving, project management, and decision-making. Known for delivering high-quality,
reliable solutions that align with business objectives.
`,
			experienceTotals: {
				yearsOfExperience: 'Years of Experience',
				softwareEngineer: 'Software Engineer',
				fullStackDeveloper: 'Full Stack Developer',
				softwareArchitecture: 'Software Architecture',
				knownProgramingLanguages: 'Known Programing Languages',
				freelanceProjects: 'Freelance Projects',
			},
			experience: {
				summary: `Experience developing RESTful APIs, webhooks, and worker services with **.NET Core**, .NET 5, .NET 6, Node.js, Nest.js, and ASP.NET MVC.
Software architecture using Domain-Driven Design (DDD), Test-Driven Development (TDD), and clean code principles, ensuring maintainability and scalability.
Development and managing custom NuGet packages for code reuse and modularity across multiple projects.
Real-time applications leveraging WebSockets and SignalR, enhancing responsiveness and interactivity.
Extensive experience containerizing applications with Docker, creating streamlined and deployable images.
Deep expertise in message brokers(AMQP), including RabbitMQ, Google Pub/Sub, and Microsoft Messaging Services, for reliable, asynchronous communication.
Skilled in frontend frameworks with experience in Angular, Vue, and Ionic, despite a focus on backend development.
`,
			},
		},
	},
};
