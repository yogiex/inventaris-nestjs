'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">inventaris documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-7d0642de57334d5b7692b9a93257acd7f872803d82e36895abbec16315d885936bfb481fa3b81915fbef041ca2704dc667b99e3517215ff77f24e19a4a8e056f"' : 'data-bs-target="#xs-controllers-links-module-AppModule-7d0642de57334d5b7692b9a93257acd7f872803d82e36895abbec16315d885936bfb481fa3b81915fbef041ca2704dc667b99e3517215ff77f24e19a4a8e056f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-7d0642de57334d5b7692b9a93257acd7f872803d82e36895abbec16315d885936bfb481fa3b81915fbef041ca2704dc667b99e3517215ff77f24e19a4a8e056f"' :
                                            'id="xs-controllers-links-module-AppModule-7d0642de57334d5b7692b9a93257acd7f872803d82e36895abbec16315d885936bfb481fa3b81915fbef041ca2704dc667b99e3517215ff77f24e19a4a8e056f"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-7d0642de57334d5b7692b9a93257acd7f872803d82e36895abbec16315d885936bfb481fa3b81915fbef041ca2704dc667b99e3517215ff77f24e19a4a8e056f"' : 'data-bs-target="#xs-injectables-links-module-AppModule-7d0642de57334d5b7692b9a93257acd7f872803d82e36895abbec16315d885936bfb481fa3b81915fbef041ca2704dc667b99e3517215ff77f24e19a4a8e056f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-7d0642de57334d5b7692b9a93257acd7f872803d82e36895abbec16315d885936bfb481fa3b81915fbef041ca2704dc667b99e3517215ff77f24e19a4a8e056f"' :
                                        'id="xs-injectables-links-module-AppModule-7d0642de57334d5b7692b9a93257acd7f872803d82e36895abbec16315d885936bfb481fa3b81915fbef041ca2704dc667b99e3517215ff77f24e19a4a8e056f"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-c227b08073711ce1fb36255e16feb2c3f50714f050ffe115d8ba7c9fca820076d7ac9aa75543681d2deb64008e04175de5d696f71a213882f778113193769469"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-c227b08073711ce1fb36255e16feb2c3f50714f050ffe115d8ba7c9fca820076d7ac9aa75543681d2deb64008e04175de5d696f71a213882f778113193769469"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-c227b08073711ce1fb36255e16feb2c3f50714f050ffe115d8ba7c9fca820076d7ac9aa75543681d2deb64008e04175de5d696f71a213882f778113193769469"' :
                                            'id="xs-controllers-links-module-AuthModule-c227b08073711ce1fb36255e16feb2c3f50714f050ffe115d8ba7c9fca820076d7ac9aa75543681d2deb64008e04175de5d696f71a213882f778113193769469"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-c227b08073711ce1fb36255e16feb2c3f50714f050ffe115d8ba7c9fca820076d7ac9aa75543681d2deb64008e04175de5d696f71a213882f778113193769469"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-c227b08073711ce1fb36255e16feb2c3f50714f050ffe115d8ba7c9fca820076d7ac9aa75543681d2deb64008e04175de5d696f71a213882f778113193769469"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-c227b08073711ce1fb36255e16feb2c3f50714f050ffe115d8ba7c9fca820076d7ac9aa75543681d2deb64008e04175de5d696f71a213882f778113193769469"' :
                                        'id="xs-injectables-links-module-AuthModule-c227b08073711ce1fb36255e16feb2c3f50714f050ffe115d8ba7c9fca820076d7ac9aa75543681d2deb64008e04175de5d696f71a213882f778113193769469"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ItemsModule.html" data-type="entity-link" >ItemsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ItemsModule-2aeb75e6d3b83c20ea288e58d0fd2cb14412b68fb21f4e40c05265fff6ef13678ad5a4e1f2c68959849c20a5bfb26bfbe3b5029ec154cf4fa573eb8670dbcd98"' : 'data-bs-target="#xs-controllers-links-module-ItemsModule-2aeb75e6d3b83c20ea288e58d0fd2cb14412b68fb21f4e40c05265fff6ef13678ad5a4e1f2c68959849c20a5bfb26bfbe3b5029ec154cf4fa573eb8670dbcd98"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ItemsModule-2aeb75e6d3b83c20ea288e58d0fd2cb14412b68fb21f4e40c05265fff6ef13678ad5a4e1f2c68959849c20a5bfb26bfbe3b5029ec154cf4fa573eb8670dbcd98"' :
                                            'id="xs-controllers-links-module-ItemsModule-2aeb75e6d3b83c20ea288e58d0fd2cb14412b68fb21f4e40c05265fff6ef13678ad5a4e1f2c68959849c20a5bfb26bfbe3b5029ec154cf4fa573eb8670dbcd98"' }>
                                            <li class="link">
                                                <a href="controllers/ItemsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ItemsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ItemsModule-2aeb75e6d3b83c20ea288e58d0fd2cb14412b68fb21f4e40c05265fff6ef13678ad5a4e1f2c68959849c20a5bfb26bfbe3b5029ec154cf4fa573eb8670dbcd98"' : 'data-bs-target="#xs-injectables-links-module-ItemsModule-2aeb75e6d3b83c20ea288e58d0fd2cb14412b68fb21f4e40c05265fff6ef13678ad5a4e1f2c68959849c20a5bfb26bfbe3b5029ec154cf4fa573eb8670dbcd98"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ItemsModule-2aeb75e6d3b83c20ea288e58d0fd2cb14412b68fb21f4e40c05265fff6ef13678ad5a4e1f2c68959849c20a5bfb26bfbe3b5029ec154cf4fa573eb8670dbcd98"' :
                                        'id="xs-injectables-links-module-ItemsModule-2aeb75e6d3b83c20ea288e58d0fd2cb14412b68fb21f4e40c05265fff6ef13678ad5a4e1f2c68959849c20a5bfb26bfbe3b5029ec154cf4fa573eb8670dbcd98"' }>
                                        <li class="link">
                                            <a href="injectables/ItemsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ItemsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MovementRequestModule.html" data-type="entity-link" >MovementRequestModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MovementRequestModule-8a97824d12db2aa6e4d330f52e55b1a78271a662e5109d4d05a357f59c091e8b1f2dc636447df0f2597e3a3b39c3a97719012f4630416b839faf49bf8eaa1485"' : 'data-bs-target="#xs-controllers-links-module-MovementRequestModule-8a97824d12db2aa6e4d330f52e55b1a78271a662e5109d4d05a357f59c091e8b1f2dc636447df0f2597e3a3b39c3a97719012f4630416b839faf49bf8eaa1485"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MovementRequestModule-8a97824d12db2aa6e4d330f52e55b1a78271a662e5109d4d05a357f59c091e8b1f2dc636447df0f2597e3a3b39c3a97719012f4630416b839faf49bf8eaa1485"' :
                                            'id="xs-controllers-links-module-MovementRequestModule-8a97824d12db2aa6e4d330f52e55b1a78271a662e5109d4d05a357f59c091e8b1f2dc636447df0f2597e3a3b39c3a97719012f4630416b839faf49bf8eaa1485"' }>
                                            <li class="link">
                                                <a href="controllers/MovementRequestController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MovementRequestController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MovementRequestModule-8a97824d12db2aa6e4d330f52e55b1a78271a662e5109d4d05a357f59c091e8b1f2dc636447df0f2597e3a3b39c3a97719012f4630416b839faf49bf8eaa1485"' : 'data-bs-target="#xs-injectables-links-module-MovementRequestModule-8a97824d12db2aa6e4d330f52e55b1a78271a662e5109d4d05a357f59c091e8b1f2dc636447df0f2597e3a3b39c3a97719012f4630416b839faf49bf8eaa1485"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MovementRequestModule-8a97824d12db2aa6e4d330f52e55b1a78271a662e5109d4d05a357f59c091e8b1f2dc636447df0f2597e3a3b39c3a97719012f4630416b839faf49bf8eaa1485"' :
                                        'id="xs-injectables-links-module-MovementRequestModule-8a97824d12db2aa6e4d330f52e55b1a78271a662e5109d4d05a357f59c091e8b1f2dc636447df0f2597e3a3b39c3a97719012f4630416b839faf49bf8eaa1485"' }>
                                        <li class="link">
                                            <a href="injectables/MovementRequestService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MovementRequestService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RoomsModule.html" data-type="entity-link" >RoomsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-RoomsModule-b7587a32d32654ee8cd38fb28114c10c61b0c9e7850d44b929d344cca1309b69e317cd14e634a8871b42d5ea883fb016b85da7ed1e59e616ecc02893af35a826"' : 'data-bs-target="#xs-controllers-links-module-RoomsModule-b7587a32d32654ee8cd38fb28114c10c61b0c9e7850d44b929d344cca1309b69e317cd14e634a8871b42d5ea883fb016b85da7ed1e59e616ecc02893af35a826"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RoomsModule-b7587a32d32654ee8cd38fb28114c10c61b0c9e7850d44b929d344cca1309b69e317cd14e634a8871b42d5ea883fb016b85da7ed1e59e616ecc02893af35a826"' :
                                            'id="xs-controllers-links-module-RoomsModule-b7587a32d32654ee8cd38fb28114c10c61b0c9e7850d44b929d344cca1309b69e317cd14e634a8871b42d5ea883fb016b85da7ed1e59e616ecc02893af35a826"' }>
                                            <li class="link">
                                                <a href="controllers/RoomsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoomsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-RoomsModule-b7587a32d32654ee8cd38fb28114c10c61b0c9e7850d44b929d344cca1309b69e317cd14e634a8871b42d5ea883fb016b85da7ed1e59e616ecc02893af35a826"' : 'data-bs-target="#xs-injectables-links-module-RoomsModule-b7587a32d32654ee8cd38fb28114c10c61b0c9e7850d44b929d344cca1309b69e317cd14e634a8871b42d5ea883fb016b85da7ed1e59e616ecc02893af35a826"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RoomsModule-b7587a32d32654ee8cd38fb28114c10c61b0c9e7850d44b929d344cca1309b69e317cd14e634a8871b42d5ea883fb016b85da7ed1e59e616ecc02893af35a826"' :
                                        'id="xs-injectables-links-module-RoomsModule-b7587a32d32654ee8cd38fb28114c10c61b0c9e7850d44b929d344cca1309b69e317cd14e634a8871b42d5ea883fb016b85da7ed1e59e616ecc02893af35a826"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RoomsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoomsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-3846b4f40a0166c003e7fb704e5b755e6bf39a5331e4001f94b0b030b251f015468245c631076647f58de71fb6c82108ff2cec205e7e0128cae9c4a2d90401ab"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-3846b4f40a0166c003e7fb704e5b755e6bf39a5331e4001f94b0b030b251f015468245c631076647f58de71fb6c82108ff2cec205e7e0128cae9c4a2d90401ab"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-3846b4f40a0166c003e7fb704e5b755e6bf39a5331e4001f94b0b030b251f015468245c631076647f58de71fb6c82108ff2cec205e7e0128cae9c4a2d90401ab"' :
                                            'id="xs-controllers-links-module-UsersModule-3846b4f40a0166c003e7fb704e5b755e6bf39a5331e4001f94b0b030b251f015468245c631076647f58de71fb6c82108ff2cec205e7e0128cae9c4a2d90401ab"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-3846b4f40a0166c003e7fb704e5b755e6bf39a5331e4001f94b0b030b251f015468245c631076647f58de71fb6c82108ff2cec205e7e0128cae9c4a2d90401ab"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-3846b4f40a0166c003e7fb704e5b755e6bf39a5331e4001f94b0b030b251f015468245c631076647f58de71fb6c82108ff2cec205e7e0128cae9c4a2d90401ab"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-3846b4f40a0166c003e7fb704e5b755e6bf39a5331e4001f94b0b030b251f015468245c631076647f58de71fb6c82108ff2cec205e7e0128cae9c4a2d90401ab"' :
                                        'id="xs-injectables-links-module-UsersModule-3846b4f40a0166c003e7fb704e5b755e6bf39a5331e4001f94b0b030b251f015468245c631076647f58de71fb6c82108ff2cec205e7e0128cae9c4a2d90401ab"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreateItem.html" data-type="entity-link" >CreateItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateRoom.html" data-type="entity-link" >CreateRoom</a>
                            </li>
                            <li class="link">
                                <a href="classes/ItemIdDTO.html" data-type="entity-link" >ItemIdDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/Items.html" data-type="entity-link" >Items</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginDTO.html" data-type="entity-link" >LoginDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterDTO.html" data-type="entity-link" >RegisterDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/RoomIdDto.html" data-type="entity-link" >RoomIdDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RoomsDTO.html" data-type="entity-link" >RoomsDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/SupplierDTO.html" data-type="entity-link" >SupplierDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateItem.html" data-type="entity-link" >UpdateItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserDTO.html" data-type="entity-link" >UserDTO</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/JwtGuard.html" data-type="entity-link" >JwtGuard</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});