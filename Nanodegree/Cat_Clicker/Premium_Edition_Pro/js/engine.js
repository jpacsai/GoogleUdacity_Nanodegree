document.addEventListener("DOMContentLoaded", function engine(){
    controller.setVariables();
    
    view.media();
    model.windowWidth.addListener(view.media);
    
    controller.instantiateCats();
    view.createList();
    controller.catNameList();
    controller.listener();   
});