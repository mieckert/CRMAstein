public with sharing class LLMComponentCtrl {    
    @AuraEnabled(cacheable=false)
    public static String generate(String prompt, String model) {        
        aiplatform.ModelsAPI.createGenerations_Request request = new aiplatform.ModelsAPI.createGenerations_Request();
        request.modelName = model;    
        request.body = new aiplatform.ModelsAPI_GenerationRequest();
        request.body.prompt = prompt;

        try {
            aiplatform.ModelsAPI modelsAPI = new aiplatform.ModelsAPI();
            aiplatform.ModelsAPI.createGenerations_Response response = modelsAPI.createGenerations(request);
            return response.Code200.generation.generatedText;
        } catch(aiplatform.ModelsAPI.createGenerations_ResponseException e) {
            System.debug('Response code: ' + e.responseCode);
            System.debug('The following exception occurred: ' + e);
            throw e;
        }
    }

    @AuraEnabled(cacheable=false)
    public static String runPrompt(String promptTemplate, String data) {
        ConnectApi.EinsteinPromptTemplateGenerationsInput promptGenerationsInput = 
            new ConnectApi.EinsteinPromptTemplateGenerationsInput();
        promptGenerationsInput.isPreview = false;

        Map<String,ConnectApi.WrappedValue> valueMap = new Map<String,ConnectApi.WrappedValue>();
        ConnectApi.WrappedValue wrappedData = new ConnectApi.WrappedValue();
        wrappedData.value = data;
        valueMap.put('Input:data', wrappedData);
        promptGenerationsInput.inputParams = valueMap;

        promptGenerationsInput.additionalConfig = new ConnectApi.EinsteinLlmAdditionalConfigInput();
        promptGenerationsInput.additionalConfig.applicationName = 'PromptTemplateGenerationsInvocable';

        // 0hfWz000000EkarIAC
        ConnectApi.EinsteinPromptTemplateGenerationsRepresentation generationsOutput = 
            ConnectApi.EinsteinLLM.generateMessagesForPromptTemplate(promptTemplate, promptGenerationsInput); 
      
        System.debug(generationsOutput);

        if(generationsOutput.generations.size() > 0) {
            return generationsOutput.generations[0].text;    
        }
        else {
            return '(Error, no output)';
        }
    }    
}