(function($){

    $.fn.typewriter = function(){

        return this.each(function(){

            const element = $(this);

            /* =========================
               GET DATA ATTRIBUTES
            ========================= */

            const texts = element.data("typewriter");

            const typingSpeed =
                parseInt(element.data("speed")) || 50;

            const deletingSpeed =
                parseInt(element.data("delete-speed")) || 25;

            const delay =
                parseInt(element.data("delay")) || 1500;

            const loop =
                String(element.data("loop")) !== "false";



            let textIndex = 0;
            let charIndex = 0;
            let isDeleting = false;



            function stripHTML(html){
                return html.replace(/<[^>]*>/g, "");
            }



            function buildHTML(elementNode, count){

                let output = "";
                let remaining = count;

                function walk(nodes){

                    nodes.each(function(){

                        if(remaining <= 0) return;

                        if(this.nodeType === 3){

                            let text = this.nodeValue;

                            if(text.length <= remaining){

                                output += text;
                                remaining -= text.length;

                            }else{

                                output += text.substring(0, remaining);
                                remaining = 0;
                            }

                        }else if(this.nodeType === 1){

                            let tag = this.tagName.toLowerCase();

                            output += "<" + tag;

                            $.each(this.attributes, function(){

                                output +=
                                    " " +
                                    this.name +
                                    '="' +
                                    this.value +
                                    '"';
                            });

                            output += ">";

                            walk($(this).contents());

                            output += "</" + tag + ">";
                        }

                    });

                }

                walk(elementNode.contents());

                return output;
            }



            function type(){

                let currentHTML = texts[textIndex];

                let plainText = stripHTML(currentHTML);

                if(!isDeleting){
                    charIndex++;
                }else{
                    charIndex--;
                }

                let visibleText =
                    plainText.substring(0, charIndex);

                let tempDiv =
                    $("<div>").html(currentHTML);

                let finalHTML =
                    buildHTML(tempDiv, visibleText.length);

                element.html(finalHTML);



                if(!isDeleting &&
                   charIndex >= plainText.length){

                    if(loop){

                        isDeleting = true;

                        setTimeout(type, delay);

                        return;

                    }else{
                        return;
                    }
                }



                if(isDeleting && charIndex <= 0){

                    isDeleting = false;

                    textIndex++;

                    if(textIndex >= texts.length){
                        textIndex = 0;
                    }
                }



                setTimeout(
                    type,
                    isDeleting
                        ? deletingSpeed
                        : typingSpeed
                );
            }



            type();

        });

    };

})(jQuery);



/* =========================
   AUTO INITIALIZE
========================= */

$(document).ready(function(){

    $(".typewriter").typewriter();

});