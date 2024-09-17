import { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { contactFields, contactNotes, contactOperations } from './description/ContactDescription';
import { opportunityFields, opportunityOperations } from './description/OpportunityDescription';
import { taskFields, taskOperations } from './description/TaskDescription';
import { calendarFields, calendarOperations } from './description/CalendarDescription'
import { getContacts, getPipelines, getPipelineStages, getTimezones, getUsers } from './GenericFunctions';

export class HighLevel implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'HighLevel',
		name: 'highLevel',
		icon: 'file:highLevel.svg',
		group: ['transform'],
		version: 1,
		description: 'Consume HighLevel API',
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		defaults: {
			name: 'HighLevel',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'highLevelOAuth2Api',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{ $credentials.baseUrl }}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Version: '2021-07-28',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Contact', value: 'contact' },
					{ name: 'Opportunity', value: 'opportunity' },
					{ name: 'Task', value: 'task' },
					{ name: 'Calendar', value: 'calendar' },
				],
				default: 'contact',
				required: true,
			},
			...contactOperations,
			...contactNotes,
			...contactFields,
			...opportunityOperations,
			...opportunityFields,
			...taskOperations,
			...taskFields,
			...calendarOperations,
			...calendarFields,
		],
	};

	methods = {
		loadOptions: {
			getContacts,
			getPipelines,
			getPipelineStages,
			getUsers,
			getTimezones,
		},
	};
}
