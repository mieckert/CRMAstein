import { LightningElement, api } from 'lwc';
import LightningAlert from 'lightning/alert';
import generate from "@salesforce/apex/LLMComponentCtrl.generate";

export default class AskStein extends LightningElement {
    @api title;
    @api results;
    @api setSelection;
    @api selectMode;
    
    @api heading;
    @api model;
    @api twoColumns;
    
    containerHeight;
    headingHeight;
    
    prompt = "What is the most import issue reported?";
    output = "";
    //output = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.\nInteger in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque.\nAliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat. Cras mollis scelerisque nunc. Nullam arcu. Aliquam consequat. Curabitur augue lorem, dapibus quis, laoreet et, pretium ac, nisi. Aenean magna nisl, mollis quis, molestie eu, feugiat in, orci. In hac habitasse platea dictumst. Fusce convallis, mauris imperdiet gravida bibendum, nisl turpis suscipit mauris, sed placerat ipsum urna sed risus.\nClass aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Integer enim pede, pretium quis, rutrum non, hendrerit id, ante. Phasellus fermentum, odio ac rutrum varius, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus. Praesent elementum hendrerit tortor. Sed semper lorem at felis. Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu, dapibus eu, fermentum et, dapibus sed, urna. Morbi interdum mollis sapien. Sed ac risus. Phasellus lacinia, magna a ullamcorper laoreet, lectus arcu pulvinar risus, vitae facilisis libero dolor a purus. Sed vel lacus. Mauris nibh felis, adipiscing varius, adipiscing in, lacinia vel, tellus. Suspendisse ac urna. Etiam pellentesque mauris ut lectus. Nunc tellus ante, mattis eget, gravida vitae, ultricies ac, leo. Integer leo pede, ornare a, lacinia eu, vulputate vel, nisl. Suspendisse mauris. Fusce accumsan mollis eros. Pellentesque a diam sit amet mi ullamcorper vehicula. Integer adipiscing risus a sem. Nullam quis massa sit amet nibh viverra malesuada. Nunc sem lacus, accumsan quis, faucibus non, congue vel, arcu. Ut scelerisque hendrerit tellus. Integer sagittis. Vivamus a mauris eget arcu gravida tristique. Nunc iaculis mi in ante. Vivamus imperdiet nibh feugiat est. Ut convallis, sem sit amet interdum consectetuer, odio augue aliquam leo, nec dapibus tortor nibh sed augue. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing. Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium libero. Cras id dui. Aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit amet, nonummy id, imperdiet feugiat, pede. Sed lectus. Donec mollis hendrerit risus. Phasellus nec sem in justo pellentesque facilisis. Etiam imperdiet imperdiet orci. Nunc nec neque. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Maecenas malesuada. Praesent congue erat at massa. Sed cursus turpis vitae tortor. Donec posuere vulputate arcu. Phasellus accumsan cursus velit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed aliquam, nisi quis porttitor congue, elit erat euismod orci, ac placerat dolor lectus quis orci. Phasellus consectetuer vestibulum elit. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc. Vestibulum fringilla pede sit amet augue. In turpis. Pellentesque posuere. Praesent turpis. Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus. Donec elit libero, sodales nec, volutpat a, suscipit non, turpis. Nullam sagittis. Suspendisse pulvinar, augue ac venenatis condimentum, sem libero volutpat nibh, nec pellentesque velit pede quis nunc.";    
    spinner = false;
    
    selectionChanged = undefined;
    // eslint-disable-next-line no-unused-vars
    @api stateChangedCallback(_prevState, _newState) {
        if(this.selectionChanged === false) {
            this.selectionChanged = true;
        }        
    }

    // ----------------------------------------------------------------
    // Layout and data getters
    // ----------------------------------------------------------------

    get promptClasses() {        
        return "slds-col slds-p-around_medium " + (this.twoColumns ? "slds-size_1-of-3" : "slds-size_1-of-1");
    }

    get promptStyle() {
        // TODO: check for twoColumns, see if we can remove the errors/warning in HTML related to style attribute
        if(this.twoColumns) {
            return `height: calc(100% - ${this.headingHeight}px)`;
        }
        
        let h = (this.containerHeight - this.headingHeight) * 0.3;
        return `height: ${h}px`;                
    }

    get textareaStyle() {
        const subtractor = 40;
        const multiplicator = this.twoColumns ? 1.0 : 0.3;        
        const h = (this.containerHeight - this.headingHeight) * multiplicator - subtractor;
        return `--slds-c-textarea-sizing-min-height: ${h}px`;
    }

    get outputClasses() {
        return "slds-col slds-p-around_medium " + (this.twoColumns ? "slds-size_2-of-3" : "slds-size_1-of-1");
    }

    get outputStyle() {
        if(this.twoColumns) {
            return `height: calc(100% - ${this.headingHeight}px)`;
        }        
        let h = (this.containerHeight - this.headingHeight) * 0.7
        return `height: ${h}px`;                    
    }

    get outputParagraphs() {
        return this.output ? this.output.split("\n") : [];        
    }

    renderedCallback() {
        window.addEventListener('resize', () => { this.handleResize(); });
        this.handleResize();
    }
    
    handleResize() {
        this.headingHeight = this.refs.heading ? this.refs.heading.offsetHeight : 0;   
        this.containerHeight = this.refs.main ? this.refs.main.offsetHeight : 0;
    }    

    // ----------------------------------------------------------------
    // Event handlers
    // ----------------------------------------------------------------

    textareaChange(evt) {
        this.prompt = evt.detail.value;
    }

    generatePrompt() {
        return "Answer the following question based on the data provided " +
            "after the question in JSON format:\n" +
            this.prompt + 
            "\n\nData in JSON format:\n" +
            JSON.stringify(this.results, null, 4);
    }    

    async run() {
        console.log("selectMode = " + this.selectMode);
        this.spinner = true;
        this.output = "";
        this.selection_changed = false;
        try {            
            let result = await generate( { prompt: this.generatePrompt(), model: this.model } );
            console.log(result);
            this.output = result;
            this.error = undefined;
        }
        catch(e) {
            console.log("Exception");
            console.log(e);
            this.output = undefined;
            this.error = e.body.exceptionType + ": " + e.body.message;
        }
        finally {
            this.spinner = false;            
        }
    }

    async showData() {
        await LightningAlert.open({
            message: JSON.stringify(this.results),            
            label: 'Data',
            theme: 'inverse'
        })
    }

    async showPrompt() {
        await LightningAlert.open({
            message: this.generatePrompt(),            
            label: 'Prompt',
            theme: 'inverse'
        })
    }    
}