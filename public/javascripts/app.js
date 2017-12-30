var App = React.createClass({
    getInitialState: function() {
        return {
            showProjects: false,
            showExperience: false,
            showGridNav: true,
            showAbout: false,
            showContact: false
        };
    },

    resetGridNav: function() {
        this.resetSectionState();
        this.setState({
            showGridNav: true
        });
    },

    resetSectionState: function() {
        this.setState({
            showProjects: false,
            showExperience: false,
            showAbout: false,
            showContact: false
        });
    },
    
    toggleGridNav: function() {
        this.setState({
            showGridNav: this.state.showGridNav == true ? false : true
        });
    },

    toggleProjects: function() {
        this.setState({
            showProjects: this.state.showProjects == true ? false : true
        });
    },

    toggleAbout: function() {
        this.setState({
            showAbout: this.state.showAbout == true ? false : true
        });
    },

    toggleContact: function() {
        this.setState({
            showContact: this.state.showContact == true ? false : true
        });
    },

    toggleExperience: function() {
        this.setState({
            showExperience: this.state.showExperience == true ? false : true
        });
    },

    render: function() {
      return (
        <div id="app">
            <Navigation resetSectionState={this.resetSectionState} showGridNav={this.state.showGridNav} toggleGridNav={this.toggleGridNav} toggleContact={this.toggleContact} toggleAbout={this.toggleAbout} toggleProjects={this.toggleProjects} toggleExperience={this.toggleExperience} />
            <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-lg-offset-2 col-md-offset-2">
                <GridNavigation resetSectionState={this.resetSectionState} toggleGridNav={this.toggleGridNav} toggleContact={this.toggleContact} showGridNav={this.state.showGridNav} toggleAbout={this.toggleAbout} toggleExperience={this.toggleExperience} toggleProjects={this.toggleProjects} />
                <Experience resetGridNav={this.resetGridNav} showExperience={this.state.showExperience} />
                <Contact resetGridNav={this.resetGridNav} showContact={this.state.showContact} />
                <About resetGridNav={this.resetGridNav} showAbout={this.state.showAbout} />
                <ProjectGrid resetGridNav={this.resetGridNav} toggleProjects={this.toggleProjects} showProjects={this.state.showProjects} />
            </div>
        </div>
      );
    }
  });

  var Navigation = React.createClass({

    navItemSelect: function(index) {
        if (this.props.showGridNav) {
            this.props.toggleGridNav();
        }

        if (index == 0) {
            this.props.resetSectionState();
            this.props.toggleAbout();
        } else if (index == 1) {
            this.props.resetSectionState();
            this.props.toggleExperience();
        } else if (index == 2) {
            this.props.resetSectionState();
            this.props.toggleProjects();
        } else {
            this.props.resetSectionState();
            this.props.toggleContact();
        }
    },

    render: function() {
        return (
            <div className="navigation col-xs-12">
                <div className="col-xs-8">
                    <span className="navigation-header">Brad Bolander</span>
                </div>
                <div className="col-xs-4">
                    <span onClick={() => {this.navItemSelect(0)}} className="navigation-item">About</span>
                    <span onClick={() => {this.navItemSelect(1)}} className="navigation-item">Experience</span>
                    <span onClick={() => {this.navItemSelect(2)}} className="navigation-item open-projects">Projects</span>
                    <span onClick={() => {this.navItemSelect(3)}} className="navigation-item">Contact</span>
                </div>
            </div>
        );
      }
  });

  var GridNavigation = React.createClass({

    navItemSelect: function(index) {
        if (index == 0) {
            this.props.toggleAbout();
            this.props.toggleGridNav();
        } else if (index == 1) {
            this.props.toggleExperience();
            this.props.toggleGridNav();
        } else if (index == 2) {
            this.props.toggleProjects();
            this.props.toggleGridNav();
        } else {
            this.props.toggleContact();
            this.props.toggleGridNav();
        }
    },
      
    render: function() {
        var showGridNav = this.props.showGridNav == true ? "magictime puffIn db" : "magictime puffOut dn";
        
        return (
            <div className="grid-nav col-xs-12">
                <div className={showGridNav}>
                    <div className="grid-nav-wrap">
                        <div onClick={() => {this.navItemSelect(0)}} className="grid-nav-item col-xs-5"><div className="grid-nav-item-underlay"></div>About</div>
                        <div onClick={() => {this.navItemSelect(1)}} className="grid-nav-item col-xs-5"><div className="grid-nav-item-underlay"></div>Experience</div>
                        <div onClick={() => {this.navItemSelect(2)}} className="grid-nav-item col-xs-5"><div className="grid-nav-item-underlay"></div>Projects</div>
                        <div onClick={() => {this.navItemSelect(3)}} className="grid-nav-item col-xs-5"><div className="grid-nav-item-underlay"></div>Contact</div>
                    </div>
                </div>
            </div>
        );
      }
  });

  var ProjectGrid = React.createClass({

    handleClick: function(index) {
        $('#hero-container').children().remove();
        this.props.toggleProjects();
        if (index == 1) {
            initProj1();
        } else if (index == 2) {
            initProj2();
        } else if (index == 3) {
            initProj3();
        } else {
            initProj4();
        };
    },


    render: function() {
        var showProjects = this.props.showProjects == true ? "magictime puffIn db" : "magictime puffOut dn";

        return (
            <div className="project-container col-xs-12">
                <div className={showProjects}>
                    <div className="projects-header">
                        <Back resetGridNav={this.props.resetGridNav} />
                        <h1 className="projects-header-title">Projects</h1>
                    </div>
                    <div onClick={() => {this.handleClick(1)}} className="project-item col-xs-12 col-sm-6 col-md-6 col-lg-6">
                        <span className="project-item-title">Shader Triangles</span>
                        <img className="project-item-image" src="/images/geometry.png" />
                    </div>
                    <div onClick={() => {this.handleClick(2)}} className="project-item col-xs-12 col-sm-6 col-md-6 col-lg-6">
                        <span className="project-item-title">Planet</span>
                        <img className="project-item-image" src="/images/planet.png" />
                    </div>
                    <div onClick={() => {this.handleClick(3)}} className="project-item col-xs-12 col-sm-6 col-md-6 col-lg-6">
                        <span className="project-item-title">Sphere geometry</span>
                        <img className="project-item-image" src="/images/geo-gen.png" />
                    </div>
                    <div onClick={() => {this.handleClick(4)}} className="project-item col-xs-12 col-sm-6 col-md-6 col-lg-6">
                        <span className="project-item-title">Garden</span>
                        <img className="project-item-image" src="/images/garden.jpg" />
                    </div> 
                </div>
            </div>
        );
      }
  });

  var Experience = React.createClass({
    
    render: function() {
        var showExperience = this.props.showExperience == true ? "magictime puffIn db" : "magictime puffOut dn";
        
        return (
            <div className={showExperience}>
                <div className="experience-container col-xs-12">
                    <Back resetGridNav={this.props.resetGridNav} />
                    <h1 className="experience-header">Work Experience</h1>
                        <div className="experience-item">
                            <div className="experience-item-head col-xs-12">
                                <img className="experience-item-image col-lg-4 col-md-4" src="https://cdn.thetiebar.com/layout/logo_header.svg" alt="The Tie Bar Logo" />
                                <div className="experience-item-head-details col-lg-8 col-md-8">
                                    <span className="experience-item-title">The Tie Bar</span>
                                    <p className="experience-description">Front End Web Developer</p>
                                    <span className="experience-item-date">April 2016 - December 2017</span>
                                </div>
                            </div>
                            <div className="experience-item-body">
                                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                            </div>
                        </div>
                        <div className="experience-item">
                            <div className="experience-item-head col-xs-12">
                                <img className="experience-item-image col-lg-4 col-md-4" src="https://cdn.shopify.com/s/files/1/1932/6945/t/1/assets/logo.svg?8576992817837470070" />
                                <div className="experience-item-head-details col-lg-8 col-md-8">
                                    <span className="experience-item-title">Bucketfeet</span>
                                    <p className="experience-description">Front End Web Developer</p>
                                    <span className="experience-item-date">November 2015 - March 2016</span>
                                </div>
                            </div>
                            <div className="experience-item-body">
                                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                            </div>
                        </div>
                </div>
            </div>
        );
      }
  });

  var Contact = React.createClass({
    
    render: function() {
        var showContact = this.props.showContact == true ? "magictime puffIn db" : "magictime puffOut dn";
        
        return (
            <div className={showContact}>
                <Back resetGridNav={this.props.resetGridNav} />
                <h1 className="contact-header">Contact</h1>
                <div className="contact-container col-xs-12">
                    <div className="contact-item col-xs-12 col-sm-6 col-md-3 col-lg-3">
                        <a href="mailto:bolanderbrad@gmail.com">
                            <i className="fa fa-2x fa-envelope-o contact-icon" aria-hidden="true"></i>
                            <span className="contact-text">bolanderbrad@gmail.com</span>
                        </a>
                    </div>
                    <div className="contact-item col-xs-12 col-sm-6 col-md-3 col-lg-3">
                        <a href="tel:989-225-7158">
                            <i className="fa fa-2x fa-mobile contact-icon" aria-hidden="true"></i>
                            <span className="contact-text">(989)225-7158</span>
                        </a>
                    </div>
                    <div className="contact-item col-xs-12 col-sm-6 col-md-3 col-lg-3">
                        <a target="_blank" href="https://github.com/bradbolander">
                            <i className="fa fa-2x fa-github contact-icon" aria-hidden="true"></i>
                            <span className="contact-text">github.com/bradbolander</span>
                        </a>
                    </div>
                    <div className="contact-item col-xs-12 col-sm-6 col-md-3 col-lg-3">
                        <a target="_blank" href="https://www.linkedin.com/in/bradbolander/">
                            <i className="fa fa-2x fa-linkedin contact-icon" aria-hidden="true"></i>
                            <span className="contact-text">linkedin.com/in/bradbolander/</span>
                        </a>
                    </div>
                </div>
            </div>
        );
      }
  });

  var About = React.createClass({
    
    render: function() {
        var showAbout = this.props.showAbout == true ? "magictime puffIn db" : "magictime puffOut dn";
        
        return (
            <div className={showAbout}>
                <Back resetGridNav={this.props.resetGridNav} />
                <h1 className="about-header">About Me</h1>
                <div className="about-container col-xs-12">
                    There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
                </div>
            </div>
        );
      }
  });

  var Back = React.createClass({
    render: function() {
        return (
            <span onClick={() => {this.props.resetGridNav()}} className="back-button glyphicon glyphicon-menu-left"></span>
        );
    }
  });

  var If = React.createClass({
    render: function() {
        if (this.props.test) return this.props.children;
        else return false;
    }
  });

  ReactDOM.render(
    <App/>,
    document.getElementById('container')
  );