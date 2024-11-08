<template>
	<VMain v-fill-parent>
		<VRow v-if="isMounted">
			<VSpacer />
			<VCol cols="10">
				<VRow>
					<VCol>
						<span class="text-xl">
							{{ headline }}
						</span>
					</VCol>
					<VSpacer />
				</VRow>
				<RowContent content-column-classes="text-start">
					<UserRoles v-model:token="token" />
				</RowContent>
				<RowLeftContent content-column-classes="text-start">
					<span class="text-slate-500 text-sm">
						{{ description }}
					</span>
				</RowLeftContent>
				<RowLeftContent>
					<Token v-model="token" />
				</RowLeftContent>
				<RowLeftContent>
					<EnvironmentSelector v-model="environment" class="tw-w-full" />
				</RowLeftContent>

				<RowLeftContent v-if="environment">
					<ApiSelector
						v-model="selectedApi"
						:environment="environment"
						class="tw-w-full"
						@updated="onApiUpdated"
						@on-selection-changed="onApiSelectionChanged"
					/>
				</RowLeftContent>

				<Swagger
					v-if="selectedApi"
					:api-base-url="selectedApi?.url"
					:id="swaggerComponentId"
					v-model:override-default-parameter-options="swaggerDefaultParameterOptions"
				>
					<template #prepend>
						<RowRightContent v-if="environment && environmentHasCompanyEndpoint(environment)">
							<CompanySelector
								v-model="selectedCompany"
								:environment="environment"
								class="tw-w-full"
								@on-selection-changed="onCompanySelectionChanged"
							/>
						</RowRightContent>
					</template>
				</Swagger>
				<RowCentralizedContent width="80%" v-if="selectedApi && isLoading">
					<Loading />
				</RowCentralizedContent>
			</VCol>
			<VSpacer />
		</VRow>
		<RowCentralizedContent v-else>
			<Loading />
		</RowCentralizedContent>
	</VMain>
</template>
<script setup lang="ts">
import EnvironmentSelector from '@/components/environment/selector/EnvironmentSelector.vue';
import { useUserStore } from '@/stores/user';
import { Api } from '@/types/api';
import { Company } from '@/types/company';
import { SwaggerOverrideDefaultParameterOptions } from '@/types/component/swagger';
import { Environment } from '@/types/environment';
import { Nullable } from '@/types/nullable';
const userStore = useUserStore();
const selectedApi = ref<Nullable<Api>>(null);
const selectedCompany = ref<Nullable<Company>>(null);

const isLoading = ref(false);
const isMounted = ref(false);
const environment = ref<Nullable<Environment>>();
const swaggerComponentId = ref<string>(generateId());
const { swaggerDefaultParameterOptions, setParameterOption, removeParameter } = useSwaggerOverrideDefaultParameter();

function onCompanySelectionChanged(company: Nullable<Company>) {
	const parameterName = 'companyId';
	if (!company) {
		removeParameter(parameterName);
		return;
	}
	const companyIdSwaggerOverrideDefaultParameterOptions: SwaggerOverrideDefaultParameterOptions = {
		name: parameterName,
		defaultValue: company.id,
		location: ['*'],
	};
	setParameterOption(companyIdSwaggerOverrideDefaultParameterOptions);
}

const headline = computed(() => {
	return getTextFromKey('pages.home.headline', { params: { name: userStore.data.user?.name } });
});

function onApiUpdated() {
	selectedApi.value = null;
}
function environmentHasCompanyEndpoint(env: Nullable<Environment>): boolean {
	if (!env) return false;
	return !!env.companyEndpoint;
}
const token = ref<Nullable<string>>(null);
const description = computed(() => getTextFromKey('pages.home.description'));
function onApiSelectionChanged(api: Nullable<Api>) {}

onMounted(async () => {
	isMounted.value = true;
});
</script>
