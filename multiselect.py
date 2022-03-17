from flask import Flask, render_template, request
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired
import json

class InviteForm(FlaskForm):
    maillist = StringField('mailist', validators=[DataRequired()])
    subject = StringField('subject', validators=[DataRequired()])
    body = StringField('body', validators=[DataRequired()])


app = Flask(__name__)
app.config['SECRET_KEY'] = 'SECRET'


@app.route('/', methods=['GET', 'POST'])
def index():
    form = InviteForm()
    emails = { 'elements': [
        'yoe@email.com',
        'yoel@test.es',
        'lenox@email.com',
        'lans@email.com',
        'juan@index.com',
        'javi@email.com'
    ]}
    # emails = {
    #     'elements': []
    # }
    if request.method == 'POST':
        pass

    return render_template('index.html', emails=json.dumps(emails), form=form)

if __name__=='__main__':
    app.run(debug=True, port=3000)