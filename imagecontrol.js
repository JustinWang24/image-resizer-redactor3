/**
 * Created by Justin Wang on 7/3/18.
 *
 * Notes: jQuery is required
 *
 * How To:
 * 1: Update redactor.js, insert following codes at line # 15100.
       "resize": {
            title: 'Resize',
            api: 'plugin.imagecontrol.open',
            args: node
        }
 * 2: Load this plugin
 * 3: Update as your need
 */
(function($R)
{
    $R.add('plugin', 'imagecontrol', {
        modals: {
            'imagecontrol': '<form action="">'
            + '<div class="form-item">'
            + '<label>## imagecontrol-width ##</label>'
            + '<input type="text" name="width" />'
            + '</div>'
            + '<div class="form-item">'
            + '<label>## imagecontrol-height ##</label>'
            + '<input type="text" name="height" />'
            + '</div>'
            + '<div class="form-item">'
            + '<label>## imagecontrol-margin ##</label>'
            + '<input type="text" name="margin" />'
            + '</div>'
            + '</form>'
        },
        translations: {
            en: {
                "imagecontrolTitle": "Resize Image",
                "imagecontrol-width": "Image Width (Must in 'px' or '%')",
                "imagecontrol-height": "Image Height (Must in 'px' or '%')",
                "imagecontrol-margin": "Image Margin ( (Must in 'px' or '%'))"
            }
        },
        // Image Element
        imageElement: null,
        // construct
        init: function(app)
        {
            // define redactor app
            this.app = app;

            // define services
            this.lang = app.lang;
            this.toolbar = app.toolbar;
            this.insertion = app.insertion;
        },

        // messages
        onmodal: {
            imagecontrol: {
                opened: function($modal, $form)
                {
                    $form.getField('width').focus();
                    // Set the field value
                    $form.getField('width').val(this.imageElement.css('width'));
                    $form.getField('height').val(this.imageElement.css('height'));
                    $form.getField('margin').val(this.imageElement.css('margin'));
                },
                insert: function($modal, $form)
                {
                    var data = $form.getData();
                    // Update the el
                    this._update(data);
                }
            }
        },

        // public
        start: function(){
            // Add your code
        },
        open: function(node)
        {
            // Get the img element from the node
            this.imageElement = $(node).find('img').eq(0);

            var options = {
                title: this.lang.get('imagecontrolTitle'),
                width: '600px',
                name: 'imagecontrol',
                handle: 'insert',
                commands: {
                    insert: { title: 'Update' },
                    cancel: { title: 'Cancel' }
                }
            };

            this.app.api('module.modal.build', options);
        },
        // Private
        _update: function(data){
            // Close Modal
            this.app.api('module.modal.close');

            // Update style
            if(data.width.length > 2){
                this.imageElement.css('width',data.width);
            }else{
                this.imageElement.css('width','');
            }

            if(data.height.length > 2){
                this.imageElement.css('height',data.height);
            }else{
                this.imageElement.css('height','');
            }

            if(data.margin.length > 2){
                this.imageElement.css('margin',data.margin);
            }else{
                this.imageElement.css('margin','');
            }
        }
    });
})(Redactor);
