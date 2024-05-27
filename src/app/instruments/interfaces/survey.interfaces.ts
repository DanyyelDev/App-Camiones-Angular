export interface Choice {
	value: number
	text: string
}

export interface Question {
	name: string
	title: string
	type: 'radiogroup'
	choices: Choice[]
	isRequired: true
	requiredErrorText: string
}

export interface QuestionsInAPage {
	elements: Question[]
}

export interface FirstPage {
	elements: [
		{
			type: 'html'
			html: string
		},
	]
}

export interface Survey {
	pages: (FirstPage | QuestionsInAPage)[]
	showProgressBar: 'top'
	pageNextText: 'Siguiente'
	pagePrevText: 'Atras'
	completeText: 'Terminar'
	firstPageIsStarted: true
	startSurveyText: 'Iniciar Diagnóstico'
	completedHtml: string
}

export interface SurveyResponse {
	id: string
	type: string
	name: string
	description: string
	orgCodde: string
	surveyJsPages: QuestionsInAPage[]
}
