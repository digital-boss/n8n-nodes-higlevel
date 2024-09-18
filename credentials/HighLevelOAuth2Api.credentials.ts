import type { ICredentialType, INodeProperties, IAuthenticateGeneric, ICredentialTestRequest, Icon } from 'n8n-workflow';

export class HighLevelOAuth2Api implements ICredentialType {
	name = 'highLevelOAuth2Api';
	//extends = ['oAuth2Api'];
	displayName = 'HighLevel OAuth2 API';
	documentationUrl = 'https://highlevel.stoplight.io/';
	icon: Icon = 'file:icons/highLevel.svg';

	properties: INodeProperties[] = [
		{
			displayName: 'Grant Type',
			name: 'grantType',
			type: 'options',
			options: [
				{
					name: 'Authorization Code',
					value: 'authorizationCode',
				},
				{
					name: 'Client Credentials',
					value: 'clientCredentials',
				},
			],
			default: 'authorizationCode',
			required: true,
		},
		{
			displayName: 'Authorization URL',
			name: 'authUrl',
			type: 'options',
			default: 'https://marketplace.leadconnectorhq.com/oauth/chooselocation',
			required: true,
			displayOptions: {
				show: {
					grantType: ['authorizationCode'],
				},
			},
			options: [
				{
					name: 'White-Label',
					value: 'https://marketplace.leadconnectorhq.com/oauth/chooselocation',
				},
				{
					name: 'Standard',
					value: 'https://marketplace.gohighlevel.com/oauth/chooselocation',
				},
			],
		},
		{
			displayName: 'Access Token URL',
			name: 'accessTokenUrl',
			type: 'string',
			default: 'https://services.leadconnectorhq.com/oauth/token',
			required: true,
			displayOptions: {
				show: {
					grantType: ['authorizationCode', 'clientCredentials'],
				},
			},
		},
		{
			displayName: 'Client ID',
			name: 'clientId',
			type: 'string',
			default: '',
			required: true,
			displayOptions: {
				show: {
					grantType: ['clientCredentials'],
				},
			},
		},
		{
			displayName: 'Client Secret',
			name: 'clientSecret',
			type: 'string',
			default: '',
			typeOptions: { password: true },
			required: true,
			displayOptions: {
				show: {
					grantType: ['clientCredentials'],
				},
			},
		},
		{
			displayName: 'Scope',
			name: 'scope',
			type: 'string',
			hint: 'Separate scopes by space, if needed.',
			default: '',
			displayOptions: {
				show: {
					grantType: ['clientCredentials'],
				},
			},
		},
		{
			displayName: 'Authentication Type',
			name: 'authentication',
			type: 'options',
			options: [
				{
					name: 'Header',
					value: 'header',
				},
				{
					name: 'Body',
					value: 'body',
				},
			],
			default: 'body',
			displayOptions: {
				show: {
					grantType: ['clientCredentials'],
				},
			},
		},
		{
			displayName: 'Auth URI Query Parameters',
			name: 'authQueryParameters',
			type: 'hidden',
			default: '',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			//@ts-ignore
			header: {
				Authorization: '={{$credentials.clientId}}',
			},
			body: {
				client_id: '={{$credentials.clientId}}',
				client_secret: '={{$credentials.clientSecret}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials?.accessTokenUrl}}',
			url: '/test',
		},
	};
}
