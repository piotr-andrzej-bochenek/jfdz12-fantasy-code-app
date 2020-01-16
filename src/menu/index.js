import React from 'react'
import { Card, Icon, Image, Segment, Dimmer, Loader } from 'semantic-ui-react'

export class PlayerList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            playersList: [],
            loading: true,
            error: null,
        }
    }
    componentDidMount() {
        this.fetchData()
    }
    fetchData() {
        fetch("/players.json")
            .then(resp => resp.json())
            .then(resp =>
                this.setState({
                    playersList: resp,
                    loading: false
                }))
            .catch(error => this.setState({
                error: "err occ"
            }))
    }

    displayPlayersList() {
        return (this.state.playersList.map(player =>
            <Card key={player.id}>
                <Image src={player.avatar} wrapped ui={false} />
                <Card.Content>
                    <Card.Header>{player.nick}</Card.Header>
                    <Card.Meta>
                        {player.levelID}
                    </Card.Meta>
                    <Card.Description>
                        {player.nick[0].toUpperCase() + player.nick.slice(1)} 
                        is a {player.class[0].toLowerCase() + player.class.slice(1) + " "} 
                        living in {player.city}.
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <a>
                        <Icon name='user' />
                        22 Friends
                    </a>
                </Card.Content>
            </Card>
        ))
    }
    render() {
        if (this.state.loading) {
            return (
                <Segment>
                    <Dimmer active>
                        <Loader size='massive'>Loading</Loader>
                    </Dimmer>

                    <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                    <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                    <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                </Segment>
            )
        } else return (
            <div>
                <Card.Group margin="12px">
                    {this.displayPlayersList()}
                </Card.Group>
            </div>
        )
    }
}