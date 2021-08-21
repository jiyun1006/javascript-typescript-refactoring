export default abstract class View{
    private template: string;
    private renderTemplate: string;
    private container: HTMLElement;
    private htmlList: string[];
    constructor(containerId: string, template: string){
      const containerElement = document.getElementById(containerId);
  
      if(!containerElement){
        throw '최상위 컨테이너 X, ui 진행 X';
      }
  
      this.container = containerElement;
      this.template = template;
      this.htmlList = [];
      this.renderTemplate = template;
    }
  
    protected updateView(): void {
      this.container.innerHTML = this.renderTemplate;
      this.renderTemplate = this.template;
    }
  
  
    protected addHtml(htmlString: string): void{
      this.htmlList.push(htmlString);
    }
  
    protected getHtml(): string{
      const snapshot = this.htmlList.join('');
      this.clearHtmlList();
      return snapshot;  
    }
  
    protected setTemplateData(key: string, value: string): void{
      this.renderTemplate = this.renderTemplate.replace(`{{__${key}__}}`, value);
    }
  
    private clearHtmlList(): void{
      this.htmlList = [];
    }
  
    abstract render(): void; // 자식들에게 구현을 부탁하는 추상 메서드
  
  }