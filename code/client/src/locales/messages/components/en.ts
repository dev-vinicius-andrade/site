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
      reliable solutions that align with business objectives.`,
		},
		experienceTotals: {
			yearsOfExperience: 'Years of Experience',
			softwareEngineer: 'Software Engineer',
			fullStackDeveloper: 'Full Stack Developer',
			softwareArchitecture: 'Software Architecture',
			knownProgramingLanguages: 'Known Programing Languages',
			freelanceProjects: 'Freelance Projects',
		},
	},
};
