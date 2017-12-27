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

    componentDidMount: function() {
      
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
            <Navigation toggleContact={this.toggleContact} toggleAbout={this.toggleAbout} toggleProjects={this.toggleProjects} toggleExperience={this.toggleExperience} />
            <div className="col-xs-6 col-lg-offset-3 col-md-offset-3">
                <GridNavigation toggleGridNav={this.toggleGridNav} toggleContact={this.toggleContact} showGridNav={this.state.showGridNav} toggleAbout={this.toggleAbout} toggleExperience={this.toggleExperience} toggleProjects={this.toggleProjects} />
                <Experience showExperience={this.state.showExperience} />
                <Contact showContact={this.state.showContact} />
                <About showAbout={this.state.showAbout} />
                <ProjectGrid toggleProjects={this.toggleProjects} showProjects={this.state.showProjects} />
            </div>
        </div>
      );
    }
  });

 

  var Navigation = React.createClass({
    render: function() {
        return (
            <div className="navigation col-xs-12">
                <div className="col-xs-8">
                    <span className="navigation-header">Brad Bolander</span>
                </div>
                <div className="col-xs-4">
                    <span onClick={() => {this.props.toggleAbout()}} className="navigation-item">About</span>
                    <span onClick={() => {this.props.toggleExperience()}} className="navigation-item">Experience</span>
                    <OpenProjects toggleProjects={this.props.toggleProjects} />
                    <span onClick={() => {this.props.toggleContact()}} className="navigation-item">Contact</span>
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
        var showGridNav = this.props.showGridNav == true ? "magictime slideRightReturn db" : "magictime slideRight dn";
        
        return (
            <div className="grid-nav col-xs-12">
                <div className={showGridNav}>
                    <div className="grid-nav-wrap">
                        <span onClick={() => {this.navItemSelect(0)}} className="grid-nav-item col-xs-5">About</span>
                        <span onClick={() => {this.navItemSelect(1)}} className="grid-nav-item col-xs-5">Experience</span>
                        <span onClick={() => {this.navItemSelect(2)}} className="grid-nav-item col-xs-5">Projects</span>
                        <span onClick={() => {this.navItemSelect(3)}} className="grid-nav-item col-xs-5">Contact</span>
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
        var showProjects = this.props.showProjects == true ? "magictime slideRightReturn db" : "magictime slideRight dn";

        return (
            <div className="project-container col-xs-12">
                <Back resetGridNav={this.props.resetGridNav} />
                <div className={showProjects}>
                    <h1 className="projects-header">Side Projects</h1>
                    <div onClick={() => {this.handleClick(1)}} className="project-item col-lg-6">
                        <span className="project-item-title">Shader Triangles</span>
                        <img className="project-item-image" src="/images/geometry.png" />
                    </div>
                    <div onClick={() => {this.handleClick(2)}} className="project-item col-xs-6">
                        <span className="project-item-title">Planet</span>
                        <img className="project-item-image" src="/images/planet.png" />
                    </div>
                    <div onClick={() => {this.handleClick(3)}} className="project-item col-xs-6">
                        <span className="project-item-title">Sphere geometry</span>
                        <img className="project-item-image" src="/images/geo-gen.png" />
                    </div>
                    <div onClick={() => {this.handleClick(4)}} className="project-item col-xs-6">
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
        var showExperience = this.props.showExperience == true ? "magictime slideRightReturn db" : "magictime slideRight dn";
        
        return (
            <div className={showExperience}>
                <Back resetGridNav={this.props.resetGridNav} />
                <div className="experience-container col-xs-12">
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
        var showContact = this.props.showContact == true ? "magictime slideRightReturn db" : "magictime slideRight dn";
        
        return (
            <div className={showContact}>
                <Back resetGridNav={this.props.resetGridNav} />
                <div className="contact-container col-xs-12">
                    <span>Enter your email</span>
                    <input type="text" value="" />
                    <textarea type="text" value="" />
                </div>
            </div>
        );
      }
  });

  var About = React.createClass({
    
    render: function() {
        var showAbout = this.props.showAbout == true ? "magictime slideRightReturn db" : "magictime slideRight dn";
        
        return (
            <div className={showAbout}>
                <Back resetGridNav={this.props.resetGridNav} />
                <div className="about-container col-xs-12">
                   
                </div>
            </div>
        );
      }
  });


  var OpenProjects = React.createClass({
    handleClick: function() {
        this.props.toggleProjects();
    },

    render: function() {
        return (
            <span onClick={() => {this.handleClick()}} className="navigation-item open-projects">Projects</span>
        );
      }
  });

  var Back = React.createClass({
    render: function() {
        return (
            <span onClick={() => {this.props.resetGridNav()}} className="back-button">Back</span>
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